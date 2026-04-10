import { NextRequest, NextResponse } from "next/server";
import { getApartmentProfile, saveApartmentProfile } from "@/lib/supabase/queries";

const API_KEY = process.env.DATA_GO_KR_API_KEY || "";
const BASE_URL = "https://apis.data.go.kr/1613000/BldRgstHubService";
const DELAY_MS = 300;

interface BuildingProfile {
  buildingName: string;
  address: string;
  structure: string;
  approvalDate: string;
  buildYear: number;
  buildingAge: number;
  grndFlrCnt: number;
  ugrndFlrCnt: number;
  hhldCnt: number;
  totalArea: number;
  exclusiveArea: number | null;
  pyeong: number | null;
  officialPrice: number | null;
  earthquakeDesign: boolean;
  riskLevel: "low" | "medium" | "high" | "critical";
  riskMessage: string;
  recommendations: string[];
}

async function callBldApi(operation: string, params: Record<string, string>): Promise<Record<string, unknown>[]> {
  const qs = new URLSearchParams({ serviceKey: API_KEY, _type: "json", numOfRows: "100", pageNo: "1", ...params }).toString();
  // serviceKey를 이중 인코딩하지 않기 위해 URL 직접 조립
  const rawQs = Object.entries({ serviceKey: API_KEY, _type: "json", numOfRows: "100", pageNo: "1", ...params })
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  const url = `${BASE_URL}/${operation}?${rawQs}`;

  const r = await fetch(url, { next: { revalidate: 86400 } }); // 24시간 캐시
  if (!r.ok) return [];

  try {
    const data = await r.json();
    const body = data?.response?.body;
    if (!body) return [];
    const items = body.items?.item;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  } catch {
    return [];
  }
}

function calcRisk(useAprDay: string): { age: number; year: number; level: "low" | "medium" | "high" | "critical"; message: string; recommendations: string[] } {
  const year = parseInt(useAprDay.slice(0, 4), 10);
  if (isNaN(year)) return { age: 0, year: 0, level: "low", message: "준공연도 정보 없음", recommendations: [] };

  const age = new Date().getFullYear() - year;

  if (age >= 30) return {
    age, year, level: "critical",
    message: `준공 ${age}년 — 전면 리모델링 또는 재건축 검토 필요`,
    recommendations: ["배관 전면 교체 필수", "방수 전체 재시공 권장", "전기 배선 점검/교체", "단열 보강 필수", "석면 자재 사용 여부 확인"],
  };
  if (age >= 20) return {
    age, year, level: "high",
    message: `준공 ${age}년 — 배관/방수 교체 필수 검토`,
    recommendations: ["급수/배수관 교체 강력 권장", "욕실/발코니 방수 재시공", "보일러 교체 검토"],
  };
  if (age >= 15) return {
    age, year, level: "medium",
    message: `준공 ${age}년 — 배관 점검 권장`,
    recommendations: ["배관 상태 점검", "보일러 효율 점검", "도배/바닥재 교체 시기"],
  };
  return {
    age, year, level: "low",
    message: `준공 ${age}년 — 비교적 최신 건물`,
    recommendations: ["인테리어 스타일 변경 위주"],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sigunguCd, bjdongCd, bun, ji, dong, ho } = body as Record<string, string>;

    if (!sigunguCd || !bjdongCd) {
      return NextResponse.json({ error: "시군구코드와 법정동코드가 필요합니다." }, { status: 400 });
    }

    // 1. 캐시 확인
    const cached = await getApartmentProfile(sigunguCd, bjdongCd, bun);
    if (cached) {
      return NextResponse.json({ profile: cached, source: "cache" });
    }

    // 2. 표제부 조회
    const titleParams: Record<string, string> = { sigunguCd, bjdongCd };
    if (bun) titleParams.bun = bun.padStart(4, "0");
    if (ji) titleParams.ji = ji.padStart(4, "0");

    const titleItems = await callBldApi("getBrTitleInfo", titleParams);

    // 아파트만 필터링
    const apts = titleItems.filter((item) => {
      const purps = String(item.etcPurps || "");
      const mainPurps = String(item.mainPurpsCdNm || "");
      return (purps.includes("아파트") || mainPurps.includes("공동주택")) && item.mainAtchGbCd === "0";
    });

    if (apts.length === 0) {
      return NextResponse.json({ error: "해당 주소에서 아파트를 찾지 못했습니다." }, { status: 404 });
    }

    // 동 필터
    let target = apts[0];
    if (dong) {
      const matched = apts.find((a) => String(a.dongNm || "").trim() === dong);
      if (matched) target = matched;
    }

    const useAprDay = String(target.useAprDay || "").trim();
    const risk = calcRisk(useAprDay);

    // 3. 총괄표제부
    await new Promise((r) => setTimeout(r, DELAY_MS));
    const recapItems = await callBldApi("getBrRecapTitleInfo", titleParams);
    const recap = recapItems[0] || {};

    // 4. 주택가격
    await new Promise((r) => setTimeout(r, DELAY_MS));
    const priceItems = await callBldApi("getBrHsprcInfo", titleParams);
    let officialPrice: number | null = null;
    if (ho && priceItems.length > 0) {
      const matched = priceItems.find((p) => String(p.hoNm || "").replace("호", "").trim() === ho.replace("호", ""));
      officialPrice = matched ? Number(matched.hsprc) : Number(priceItems[0].hsprc);
    } else if (priceItems.length > 0) {
      officialPrice = Number(priceItems[0].hsprc);
    }

    const profile: BuildingProfile = {
      buildingName: String(target.bldNm || "").trim(),
      address: String(target.newPlatPlc || target.platPlc || "").trim(),
      structure: String(target.strctCdNm || target.etcStrct || "").trim(),
      approvalDate: useAprDay,
      buildYear: risk.year,
      buildingAge: risk.age,
      grndFlrCnt: Number(target.grndFlrCnt) || 0,
      ugrndFlrCnt: Number(target.ugrndFlrCnt) || 0,
      hhldCnt: Number(target.hhldCnt) || 0,
      totalArea: Number(target.totArea) || 0,
      exclusiveArea: null,
      pyeong: null,
      officialPrice,
      earthquakeDesign: target.rserthqkDsgnApplyYn === "1",
      riskLevel: risk.level,
      riskMessage: risk.message,
      recommendations: risk.recommendations,
    };

    // 5. DB 캐싱
    try {
      await saveApartmentProfile({
        sigungu_cd: sigunguCd,
        bjdong_cd: bjdongCd,
        bun: bun || null,
        ji: ji || null,
        building_name: profile.buildingName,
        address: profile.address,
        structure: profile.structure,
        approval_date: profile.approvalDate,
        build_year: profile.buildYear,
        building_age: profile.buildingAge,
        total_area: profile.totalArea,
        floors_above: profile.grndFlrCnt,
        floors_below: profile.ugrndFlrCnt,
        total_households: profile.hhldCnt,
        official_price: profile.officialPrice,
        earthquake_design: profile.earthquakeDesign,
        risk_level: profile.riskLevel,
        risk_description: profile.riskMessage,
        raw_data: target,
      });
    } catch (e) {
      console.error("프로필 캐싱 실패:", e);
    }

    return NextResponse.json({ profile, source: "api" });
  } catch (error) {
    console.error("Building API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "건축물대장 조회 실패" },
      { status: 500 },
    );
  }
}

import { createServerComponentClient } from "./client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type Client = SupabaseClient<Database>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rpc(supabase: Client, fn: string, params: Record<string, unknown>): Promise<{ data: any; error: any }> {
  // Use type assertion to bypass strict RPC arg typing from auto-generated types
  return (supabase.rpc as any)(fn, params);
}

export async function getProcessBenchmarks() {
  const supabase = createServerComponentClient();
  const { data, error } = await supabase
    .from("v4_process_benchmarks")
    .select("*");
  if (error) throw error;
  return data;
}

export async function getStandardQuantities(area: number) {
  const supabase = createServerComponentClient();
  const { data, error } = await supabase
    .from("v4_standard_quantities")
    .select("*")
    .eq("area_py", area);
  if (error) throw error;
  return data;
}

export async function getKnowledgeBase(query: string, matchCount = 5) {
  const supabase = createServerComponentClient();
  const { data, error } = await rpc(supabase, "match_knowledge_base", {
    query_text: query,
    match_count: matchCount,
  });
  if (error) throw error;
  return data;
}

export async function estimateByAreaV2(params: {
  p_area_py: number;
  p_apartment_type?: string;
  p_scope?: string;
}) {
  const supabase = createServerComponentClient();
  const { data, error } = await rpc(supabase, "estimate_by_area_v2", params);
  if (error) throw error;
  return data;
}

export async function getProcessItemsV2(params: {
  p_process_name: string;
  p_area_py?: number;
}) {
  const supabase = createServerComponentClient();
  const { data, error } = await rpc(supabase, "get_process_items_v2", params);
  if (error) throw error;
  return data;
}

export async function auditGetPercentile(params: {
  p_process_name: string;
  p_amount: number;
  p_area_py: number;
}) {
  const supabase = createServerComponentClient();
  const { data, error } = await rpc(supabase, "audit_get_percentile", params);
  if (error) throw error;
  return data;
}

// ── 시장 컨텍스트: 집닥 시공사례 기반 ──

export interface MarketContext {
  totalCases: number;
  topContractors: { name: string; count: number }[];
  styleDistribution: { style: string; count: number; ratio: number }[];
  avgRating: number | null;
  reviewCount: number;
}

export async function getMarketContext(pyeong: number, region?: string): Promise<MarketContext> {
  const supabase = createServerComponentClient();

  // 1. 시공사례: pyeong ± 5 + 지역 필터
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let caseQuery = (supabase.from("v4_platform_cases") as any)
    .select("contractor, styles, pyeong, region")
    .gte("pyeong", pyeong - 5)
    .lte("pyeong", pyeong + 5);

  if (region) {
    // 지역명에서 시/구 추출 (예: "서울 강남구 청담동" → "강남")
    const regionParts = region.split(/\s+/);
    const keyword = regionParts.length >= 2 ? regionParts[1].replace(/구$|시$/, "") : regionParts[0];
    caseQuery = caseQuery.ilike("region", `%${keyword}%`);
  }

  const { data: cases, error: caseErr } = await caseQuery.limit(1000);
  if (caseErr) console.error("시장사례 조회 오류:", caseErr);

  const caseList = cases || [];

  // 업체별 사례 수
  const contractorMap: Record<string, number> = {};
  const styleMap: Record<string, number> = {};

  for (const c of caseList) {
    if (c.contractor) {
      contractorMap[c.contractor] = (contractorMap[c.contractor] || 0) + 1;
    }
    if (c.styles && Array.isArray(c.styles)) {
      for (const s of c.styles) {
        styleMap[s] = (styleMap[s] || 0) + 1;
      }
    }
  }

  const topContractors = Object.entries(contractorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const totalStyleCount = Object.values(styleMap).reduce((s, v) => s + v, 0);
  const styleDistribution = Object.entries(styleMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([style, count]) => ({
      style,
      count,
      ratio: totalStyleCount > 0 ? Math.round((count / totalStyleCount) * 100) : 0,
    }));

  // 2. 후기 평균 평점
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: reviews, error: revErr } = await (supabase.from("v4_platform_reviews") as any)
    .select("rating")
    .not("rating", "is", null)
    .limit(1000);

  if (revErr) console.error("후기 조회 오류:", revErr);

  const reviewList = reviews || [];
  const avgRating = reviewList.length > 0
    ? Math.round((reviewList.reduce((s: number, r: { rating?: number }) => s + (r.rating || 0), 0) / reviewList.length) * 10) / 10
    : null;

  return {
    totalCases: caseList.length,
    topContractors,
    styleDistribution,
    avgRating,
    reviewCount: reviewList.length,
  };
}

// ── 아파트 프로필 캐시 ──

export async function getApartmentProfile(sigunguCd: string, bjdongCd: string, bun?: string, buildingName?: string) {
  const supabase = createServerComponentClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase.from("v4_apartment_profiles") as any)
    .select("*")
    .eq("sigungu_cd", sigunguCd)
    .eq("bjdong_cd", bjdongCd);

  if (bun) query = query.eq("bun", bun);
  if (buildingName) query = query.ilike("building_name", `%${buildingName}%`);

  const { data, error } = await query.limit(1).maybeSingle();
  if (error) console.error("아파트 프로필 조회 오류:", error);
  return data;
}

export async function saveApartmentProfile(profile: Record<string, unknown>) {
  const supabase = createServerComponentClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from("v4_apartment_profiles") as any)
    .upsert(profile, { onConflict: "sigungu_cd,bjdong_cd,bun,ji,building_name" })
    .select()
    .single();
  if (error) console.error("아파트 프로필 저장 오류:", error);
  return data;
}

export async function saveUploadedDocument(doc: {
  session_id?: string;
  document_type: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  extracted_data?: Record<string, unknown>;
  apartment_name?: string;
  area_py?: number;
  region?: string;
}) {
  const supabase = createServerComponentClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from("uploaded_documents") as any)
    .insert(doc)
    .select()
    .single();
  if (error) throw error;
  return data;
}

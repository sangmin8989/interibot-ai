// 견적서 분석 엔진 v2
// "판정 엔진" → "대화 도우미" 재설계
// 범위 표시 + 맥락 제공 + 신뢰도 표시

import type { ExtractedQuote, AnalysisItem, AnalysisReport, RangePosition, ConfidenceLevel, MissingProcess } from "@/types";
import { STANDARD_PROCESSES } from "@/types";
import { createServerComponentClient } from "@/lib/supabase/client";
import { PROCESS_CRITICALITY, PROCESS_CONTEXT, MISSING_CONTEXT, BUNDLE_MAP } from "@/lib/data/process-context";

interface Benchmark {
  process_name: string;
  area_py: number;
  sample_count: number;
  p25: number;
  p50: number;
  p75: number;
  source: string | null;
}

// ── 범위 위치 판정 ──
function determinePosition(amount: number, p25: number, p75: number): RangePosition {
  if (amount < p25) return "below";
  if (amount <= p75) return "within";
  if (amount <= p75 * 1.5) return "upper";
  return "above";
}

// ── 로그정규 분포 CDF (Abramowitz & Stegun 근사) ──
function normalCDF(x: number): number {
  if (x < -8) return 0;
  if (x > 8) return 1;
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x) / Math.SQRT2;
  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return 0.5 * (1.0 + sign * y);
}

/**
 * 로그정규 분포 피팅으로 연속적 위치 비율(0-1) 계산
 * 실패 시 구간 선형 보간 fallback
 */
function calculatePositionRatio(amount: number, p25: number, p50: number, p75: number): number {
  // 로그정규 분포 시도
  if (p25 > 0 && p50 > 0 && p75 > 0 && p25 < p50 && p50 < p75 && amount > 0) {
    const Z75 = 0.6745;
    const mu = Math.log(p50);
    const sigmaHigh = (Math.log(p75) - mu) / Z75;
    const sigmaLow = (mu - Math.log(p25)) / Z75;
    const sigma = (sigmaHigh + sigmaLow) / 2;

    if (sigma > 0) {
      const z = (Math.log(amount) - mu) / sigma;
      const pct = normalCDF(z);
      return Math.max(0, Math.min(1, pct));
    }
  }

  // Fallback: 구간 선형 보간
  const iqr = p75 - p25;
  const floor = Math.max(0, p25 - 1.5 * iqr);
  const ceiling = p75 + 1.5 * iqr;

  if (amount <= floor) return 0;
  if (amount >= ceiling) return 1;
  if (amount <= p25) return 0.05 + 0.2 * ((amount - floor) / (p25 - floor));
  if (amount <= p50) return 0.25 + 0.25 * ((amount - p25) / (p50 - p25));
  if (amount <= p75) return 0.5 + 0.25 * ((amount - p50) / (p75 - p50));
  return 0.75 + 0.25 * ((amount - p75) / (ceiling - p75));
}

// ── 신뢰도 계산 ──
function getConfidence(sampleCount: number): ConfidenceLevel {
  if (sampleCount >= 30) return "high";
  if (sampleCount >= 10) return "moderate";
  return "low";
}

// ── 필수 공정 (critical + standard) ──
const CHECKED_PROCESSES = STANDARD_PROCESSES.filter(
  (p) => PROCESS_CRITICALITY[p] === "critical" || PROCESS_CRITICALITY[p] === "standard"
);

/**
 * 견적서 분석 리포트 생성 (v2 — 범위 기반)
 */
export async function generateAnalysisReport(
  quote: ExtractedQuote,
  areaPy: number,
): Promise<AnalysisReport> {
  const supabase = createServerComponentClient();
  const { data: benchmarks, error } = await supabase
    .from("v4_process_benchmarks")
    .select("*");
  if (error) throw error;
  const bms = (benchmarks ?? []) as unknown as Benchmark[];

  const items: AnalysisItem[] = [];
  let totalRangeLow = 0;
  let totalRangeHigh = 0;
  let totalMedian = 0;

  for (const item of quote.items) {
    // 벤치마크 찾기: 정확한 평수 → 가장 가까운 평수 → 비례 환산
    let bm = bms.find((b) => b.process_name === item.processName && b.area_py === areaPy);
    let source = "시장 데이터 기준";
    let sampleCount = 0;

    if (!bm) {
      // 같은 공정의 가장 가까운 평수 찾기
      const sameProcBms = bms
        .filter((b) => b.process_name === item.processName)
        .sort((a, b) => Math.abs(a.area_py - areaPy) - Math.abs(b.area_py - areaPy));

      if (sameProcBms.length >= 2) {
        // 브라켓 보간: area_py 기준으로 아래/위에서 가장 가까운 것을 찾음
        const belows = sameProcBms.filter((b) => b.area_py <= areaPy).sort((a, b) => b.area_py - a.area_py);
        const aboves = sameProcBms.filter((b) => b.area_py >= areaPy).sort((a, b) => a.area_py - b.area_py);
        const lower = belows[0];
        const upper = aboves[0];
        if (lower && upper && lower.area_py !== upper.area_py) {
          const t = (areaPy - lower.area_py) / (upper.area_py - lower.area_py);
          bm = {
            process_name: item.processName,
            area_py: areaPy,
            sample_count: Math.min(lower.sample_count, upper.sample_count),
            p25: Math.round(lower.p25 + t * (upper.p25 - lower.p25)),
            p50: Math.round(lower.p50 + t * (upper.p50 - lower.p50)),
            p75: Math.round(lower.p75 + t * (upper.p75 - lower.p75)),
            source: lower.source,
          };
          source = `시장 데이터 기준 (${lower.area_py}~${upper.area_py}평 보간)`;
        }
      }

      if (!bm && sameProcBms.length > 0) {
        const nearest = sameProcBms[0];
        const ratio = areaPy / nearest.area_py;
        bm = {
          process_name: item.processName,
          area_py: areaPy,
          sample_count: Math.max(1, Math.round(nearest.sample_count * 0.7)),
          p25: Math.round(nearest.p25 * ratio),
          p50: Math.round(nearest.p50 * ratio),
          p75: Math.round(nearest.p75 * ratio),
          source: nearest.source,
        };
        source = `시장 데이터 기준 (${nearest.area_py}평 비례 환산)`;
      }
    }

    if (!bm) continue; // 벤치마크 전혀 없는 공정은 스킵

    sampleCount = bm.sample_count || 1;
    const position = determinePosition(item.amount, bm.p25, bm.p75);
    const positionRatio = calculatePositionRatio(item.amount, bm.p25, bm.p50, bm.p75);
    const ctx = PROCESS_CONTEXT[item.processName] || { highReasons: [], suggestedQuestion: "" };

    totalRangeLow += bm.p25;
    totalRangeHigh += bm.p75;
    totalMedian += bm.p50;

    items.push({
      processName: item.processName,
      userAmount: item.amount,
      rangeLow: bm.p25,
      rangeHigh: bm.p75,
      median: bm.p50,
      position,
      positionRatio,
      context: {
        possibleReasons: ctx.highReasons,
        suggestedQuestion: ctx.suggestedQuestion,
        confidence: getConfidence(sampleCount),
        sampleCount,
      },
      source,
    });
  }

  // ── 누락 공정 탐지 (번들 해소 포함) ──
  const quoteProcessNames = quote.items.map((i) => i.processName);

  // 번들 체크: "설비공사"가 있으면 "도기공사","수전공사"는 누락으로 안 잡음
  const coveredByBundle = new Set<string>();
  for (const [parent, children] of Object.entries(BUNDLE_MAP)) {
    if (quoteProcessNames.includes(parent)) {
      children.forEach((c) => coveredByBundle.add(c));
    }
  }

  const missingProcesses: MissingProcess[] = CHECKED_PROCESSES
    .filter((p) => !quoteProcessNames.includes(p) && !coveredByBundle.has(p))
    .map((p) => ({
      processName: p,
      criticality: PROCESS_CRITICALITY[p] || "optional",
      reason: MISSING_CONTEXT[p] || "견적서에 포함되지 않았습니다.",
    }));

  // ── 비율 분석 ──
  const totalAmount = quote.totalAmount || items.reduce((s, i) => s + i.userAmount, 0);
  const processRatios = items.map((i) => ({
    processName: i.processName,
    ratio: totalAmount > 0 ? Math.round((i.userAmount / totalAmount) * 100) : 0,
  }));

  // ── 신뢰도 종합 ──
  const confidences = items.map((i) => i.context.confidence);
  const overallConfidence: ConfidenceLevel =
    confidences.includes("low") ? "low" :
    confidences.includes("moderate") ? "moderate" : "high";

  const perPyeongCost = areaPy > 0 ? Math.round(totalAmount / areaPy) : 0;
  const totalSamples = items.length > 0 ? Math.min(...items.map((i) => i.context.sampleCount)) : 0;

  return {
    items,
    missingProcesses,
    totalAmount,
    totalRangeLow,
    totalRangeHigh,
    totalMedian,
    perPyeongCost,
    typicalPerPyeongRange: [
      areaPy > 0 ? Math.round(totalRangeLow / areaPy) : 0,
      areaPy > 0 ? Math.round(totalRangeHigh / areaPy) : 0,
    ],
    processRatios,
    overallConfidence,
    sampleBasis: `시장 ${totalSamples > 0 ? totalSamples : "—"}건 기준`,
    disclaimer: "이 분석은 참고용이며, 자재 등급·시공 범위·지역에 따라 달라질 수 있습니다.",
  };
}

// ── Legacy export (기존 호환) ──
export { generateAnalysisReport as generateAuditReport };

// 견적서 감사 엔진
// v4_process_benchmarks 기반 P25/P50/P75 비교

import type { ExtractedQuote, AuditItem, AuditReport, Verdict } from "@/types";
import { STANDARD_PROCESSES } from "@/types";
import { auditGetPercentile } from "@/lib/supabase/queries";
import { createServerComponentClient } from "@/lib/supabase/client";

interface Benchmark {
  process_name: string;
  area_py: number;
  p25: number;
  p50: number;
  p75: number;
  source: string | null;
}

// 필수 공정 체크리스트 (올수리 기준)
const REQUIRED_PROCESSES = [
  "철거공사",
  "목공사",
  "전기공사",
  "설비공사",
  "타일공사",
  "도장공사",
  "도배공사",
  "바닥공사",
];

function determineVerdict(percentile: number): Verdict {
  if (percentile >= 90) return "BLOCK";
  if (percentile >= 75) return "WARN";
  return "PASS";
}

export async function generateAuditReport(
  quote: ExtractedQuote,
  areaPy: number
): Promise<AuditReport> {
  const supabase = createServerComponentClient();
  const { data: benchmarks, error } = await supabase
    .from("v4_process_benchmarks")
    .select("*");
  if (error) throw error;
  const bms = (benchmarks ?? []) as unknown as Benchmark[];

  const auditItems: AuditItem[] = [];
  let totalBenchmarkP50 = 0;

  for (const item of quote.items) {
    // 벤치마크에서 해당 공정 + 평수 찾기
    const bm = bms.find(
      (b) => b.process_name === item.processName && b.area_py === areaPy
    );

    if (!bm) {
      // 벤치마크 없으면 다른 평수 기준으로 비례 계산 시도
      const anyBm = bms.find((b) => b.process_name === item.processName);
      if (anyBm) {
        const ratio = areaPy / anyBm.area_py;
        const adjustedP25 = Math.round(anyBm.p25 * ratio);
        const adjustedP50 = Math.round(anyBm.p50 * ratio);
        const adjustedP75 = Math.round(anyBm.p75 * ratio);

        // 간단한 백분위 계산
        let percentile: number;
        if (item.amount <= adjustedP25) percentile = 25;
        else if (item.amount <= adjustedP50) percentile = 50;
        else if (item.amount <= adjustedP75) percentile = 75;
        else percentile = Math.min(99, 75 + ((item.amount - adjustedP75) / adjustedP75) * 25);

        totalBenchmarkP50 += adjustedP50;
        auditItems.push({
          processName: item.processName,
          userAmount: item.amount,
          p25: adjustedP25,
          p50: adjustedP50,
          p75: adjustedP75,
          percentile: Math.round(percentile),
          verdict: determineVerdict(percentile),
          source: `시장 데이터 기준 (${anyBm.area_py}평 비례 환산)`,
        });
      }
      continue;
    }

    // RPC로 정확한 백분위 계산 시도
    let percentile: number;
    try {
      const result = await auditGetPercentile({
        p_process_name: item.processName,
        p_amount: item.amount,
        p_area_py: areaPy,
      });
      percentile = typeof result === "number" ? result : (result as { percentile?: number })?.percentile ?? 50;
    } catch {
      // RPC 실패 시 간단한 계산
      if (item.amount <= bm.p25) percentile = 25;
      else if (item.amount <= bm.p50) percentile = 50;
      else if (item.amount <= bm.p75) percentile = 75;
      else percentile = Math.min(99, 75 + ((item.amount - bm.p75) / bm.p75) * 25);
    }

    totalBenchmarkP50 += bm.p50;
    auditItems.push({
      processName: item.processName,
      userAmount: item.amount,
      p25: bm.p25,
      p50: bm.p50,
      p75: bm.p75,
      percentile: Math.round(percentile),
      verdict: determineVerdict(percentile),
      source: "시장 데이터 기준",
    });
  }

  // 누락 공정 탐지
  const quoteProcessNames = quote.items.map((i) => i.processName);
  const missingProcesses = REQUIRED_PROCESSES.filter(
    (p) => !quoteProcessNames.includes(p)
  );

  // 전체 판정
  const hasBlock = auditItems.some((i) => i.verdict === "BLOCK") || missingProcesses.length > 0;
  const hasWarn = auditItems.some((i) => i.verdict === "WARN");
  const overallVerdict: Verdict = hasBlock ? "BLOCK" : hasWarn ? "WARN" : "PASS";

  return {
    overallVerdict,
    items: auditItems,
    missingProcesses,
    totalAmount: quote.totalAmount,
    benchmarkP50Total: totalBenchmarkP50,
    source: "시장 450건 기준",
  };
}

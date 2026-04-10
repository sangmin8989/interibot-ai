"use client";

import Link from "next/link";
import type { AnalysisReport } from "@/types";
import { formatWon, getPositionStyle } from "@/lib/demo-data";
import RangeBar from "./RangeBar";
import { FadeIn } from "@/components/shared/motion";

interface MarketContext {
  totalCases: number;
  topContractors: { name: string; count: number }[];
  styleDistribution: { style: string; count: number; ratio: number }[];
  avgRating: number | null;
  reviewCount: number;
}

interface BuildingRisk {
  buildingName: string;
  address: string;
  buildYear: number;
  buildingAge: number;
  structure: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  riskMessage: string;
  recommendations: string[];
}

const riskEmoji: Record<string, string> = { low: "🟢", medium: "🟡", high: "🟠", critical: "🔴" };
const riskLabel: Record<string, string> = { low: "양호", medium: "주의", high: "위험", critical: "심각" };

export default function AuditReportView({ report, corrections, marketContext, buildingRisk }: {
  report: AnalysisReport;
  corrections?: string[];
  marketContext?: MarketContext | null;
  buildingRisk?: BuildingRisk | null;
}) {
  const attentionItems = report.items.filter((i) => i.position === "above" || i.position === "below");
  const criticalMissing = report.missingProcesses.filter((m) => m.criticality === "critical");
  const standardMissing = report.missingProcesses.filter((m) => m.criticality === "standard");

  return (
    <div className="space-y-8">
      {/* ── 보정 알림 ── */}
      {corrections && corrections.length > 0 && (
        <FadeIn>
          <div className="rounded-sm border border-[#C9A96E]/20 bg-[#C9A96E]/5 px-4 py-3">
            <p className="text-[10px] font-medium tracking-[0.2em] text-[#C9A96E]">자동 보정</p>
            <ul className="mt-2 space-y-0.5 text-xs text-[#1A1A1A]/50">
              {corrections.map((c) => <li key={c}>· {c}</li>)}
            </ul>
          </div>
        </FadeIn>
      )}

      {/* ── 1. 요약 카드 ── */}
      <FadeIn>
        <div className="rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-5 shadow-sm lg:p-6">
          <p className="text-[10px] tracking-[0.3em] text-[#C9A96E]">분석 요약</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-serif text-2xl text-[#1A1A1A]">{formatWon(report.totalAmount)}</span>
            <span className={`rounded-sm px-2 py-0.5 text-[10px] font-medium ${report.overallConfidence === "high" ? "bg-[#C9A96E]/10 text-[#C9A96E]" : "bg-[#1A1A1A]/[0.04] text-[#1A1A1A]/40"}`}>
              {report.sampleBasis}
            </span>
          </div>

          <div className="mt-3 space-y-1 text-xs text-[#1A1A1A]/40">
            <p>유사 아파트 범위: {formatWon(report.totalRangeLow)} ~ {formatWon(report.totalRangeHigh)}</p>
            <p>평당 비용: {formatWon(report.perPyeongCost)} (일반 범위: {formatWon(report.typicalPerPyeongRange[0])} ~ {formatWon(report.typicalPerPyeongRange[1])})</p>
          </div>
        </div>
      </FadeIn>

      {/* ── 2. 확인 필요 항목 ── */}
      {attentionItems.length > 0 && (
        <FadeIn delay={0.1}>
          <div className="rounded-sm border border-[#C9A96E]/20 bg-[#C9A96E]/[0.03] p-5 lg:p-6">
            <p className="text-[10px] tracking-[0.3em] text-[#C9A96E]">확인이 필요한 항목</p>
            <div className="mt-4 space-y-3">
              {attentionItems.map((item) => (
                <RangeBar key={item.processName} item={item} />
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── 3. 누락 공정 ── */}
      {report.missingProcesses.length > 0 && (
        <FadeIn delay={0.15}>
          <div className="rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-5 lg:p-6">
            <p className="text-[10px] tracking-[0.3em] text-[#C9A96E]">포함되지 않은 공정</p>

            {criticalMissing.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-medium text-[#1A1A1A]/60">필수 확인</p>
                <div className="mt-2 space-y-2">
                  {criticalMissing.map((m) => (
                    <div key={m.processName} className="flex gap-2 rounded-sm bg-[#1A1A1A]/[0.03] px-3 py-2.5">
                      <span className="shrink-0 text-sm">⚠</span>
                      <div>
                        <p className="text-xs font-medium text-[#1A1A1A]/70">{m.processName}</p>
                        <p className="mt-0.5 text-[11px] text-[#1A1A1A]/40 [word-break:keep-all]">{m.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {standardMissing.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-medium text-[#1A1A1A]/40">참고</p>
                <div className="mt-2 space-y-1">
                  {standardMissing.map((m) => (
                    <div key={m.processName} className="flex gap-2 py-1">
                      <span className="text-[#1A1A1A]/20">·</span>
                      <p className="text-xs text-[#1A1A1A]/40 [word-break:keep-all]">
                        <span className="text-[#1A1A1A]/50">{m.processName}</span> — {m.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* ── 4. 전체 공정 분석 ── */}
      <FadeIn delay={0.2}>
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.3em] text-[#C9A96E]">전체 공정 분석</p>
          {report.items
            .sort((a, b) => {
              const order = { above: 0, upper: 1, below: 2, within: 3 };
              return (order[a.position] ?? 4) - (order[b.position] ?? 4);
            })
            .map((item) => (
              <RangeBar key={item.processName} item={item} />
            ))}
        </div>
      </FadeIn>

      {/* ── 5. 비용 비율 ── */}
      <FadeIn delay={0.25}>
        <div className="rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-5 lg:p-6">
          <p className="text-[10px] tracking-[0.3em] text-[#C9A96E]">공정별 비용 비율</p>
          <div className="mt-4 space-y-2">
            {report.processRatios.sort((a, b) => b.ratio - a.ratio).map((pr) => (
              <div key={pr.processName} className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-xs text-[#1A1A1A]/50">{pr.processName}</span>
                <div className="flex-1 h-1.5 rounded-full bg-[#1A1A1A]/[0.04]">
                  <div className="h-full rounded-full bg-[#C9A96E]/40" style={{ width: `${pr.ratio}%` }} />
                </div>
                <span className="w-8 text-right font-mono text-[10px] text-[#1A1A1A]/30">{pr.ratio}%</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ── 건물 리스크 ── */}
      {buildingRisk && (
        <FadeIn delay={0.27}>
          <div className={`rounded-sm border p-5 lg:p-6 ${buildingRisk.riskLevel === "critical" ? "border-red-200 bg-red-50/50" : buildingRisk.riskLevel === "high" ? "border-orange-200 bg-orange-50/30" : "border-[#1A1A1A]/[0.06] bg-white"}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{riskEmoji[buildingRisk.riskLevel]}</span>
              <p className="text-[10px] tracking-[0.3em] text-[#C9A96E]">건물 진단</p>
              <span className={`ml-auto rounded-sm px-2 py-0.5 text-[10px] font-medium ${buildingRisk.riskLevel === "critical" ? "bg-red-100 text-red-600" : buildingRisk.riskLevel === "high" ? "bg-orange-100 text-orange-600" : "bg-[#C9A96E]/10 text-[#C9A96E]"}`}>
                {riskLabel[buildingRisk.riskLevel]}
              </span>
            </div>
            <div className="mt-3 space-y-1 text-xs text-[#1A1A1A]/60">
              <p className="font-medium">{buildingRisk.buildingName}</p>
              <p className="text-[#1A1A1A]/40">{buildingRisk.address}</p>
              <p>준공 {buildingRisk.buildYear}년 ({buildingRisk.buildingAge}년 경과) · {buildingRisk.structure}</p>
            </div>
            {buildingRisk.recommendations.length > 0 && (
              <div className="mt-3 space-y-1">
                {buildingRisk.recommendations.map((r) => (
                  <p key={r} className="text-[11px] text-[#1A1A1A]/50">⚠ {r}</p>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* ── 시장 참고 정보 ── */}
      {marketContext && marketContext.totalCases > 0 && (
        <FadeIn delay={0.29}>
          <div className="rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-5 lg:p-6">
            <p className="text-[10px] tracking-[0.3em] text-[#C9A96E]">📊 시장 참고 정보</p>
            <p className="mt-3 text-xs text-[#1A1A1A]/50">
              비슷한 조건의 집닥 시공사례: <span className="font-medium text-[#1A1A1A]/70">{marketContext.totalCases}건</span>
            </p>

            {marketContext.topContractors.length > 0 && (
              <div className="mt-3">
                <p className="text-[10px] text-[#1A1A1A]/40">활발한 업체</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {marketContext.topContractors.map((c) => (
                    <span key={c.name} className="rounded-sm bg-[#1A1A1A]/[0.04] px-2 py-1 text-[11px] text-[#1A1A1A]/60">
                      {c.name} ({c.count})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {marketContext.styleDistribution.length > 0 && (
              <div className="mt-3">
                <p className="text-[10px] text-[#1A1A1A]/40">인기 스타일</p>
                <div className="mt-1.5 flex gap-3">
                  {marketContext.styleDistribution.map((s) => (
                    <span key={s.style} className="text-[11px] text-[#1A1A1A]/50">
                      {s.style} <span className="text-[#C9A96E]">{s.ratio}%</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {marketContext.avgRating && (
              <p className="mt-2 text-[11px] text-[#1A1A1A]/40">
                고객 평균 평점: <span className="text-[#C9A96E]">{marketContext.avgRating}/5.0</span> ({marketContext.reviewCount}건 기준)
              </p>
            )}
          </div>
        </FadeIn>
      )}

      {/* ── 6. 면책 조항 ── */}
      <FadeIn delay={0.3}>
        <p className="text-center text-[10px] leading-relaxed text-[#1A1A1A]/25 [word-break:keep-all]">
          {report.disclaimer}
        </p>
      </FadeIn>

      {/* ── 7. CTA ── */}
      <FadeIn delay={0.35}>
        <div className="flex flex-col gap-3 lg:flex-row">
          <Link href="/hvi" className="flex h-12 flex-1 items-center justify-center rounded-sm border border-[#1A1A1A]/[0.06] text-sm text-[#1A1A1A]/60 transition hover:border-[#1A1A1A]/15 active:scale-[0.98]">
            집값 분석 →
          </Link>
          <Link href="/chat" className="flex h-12 flex-1 items-center justify-center rounded-sm bg-[#1A1A1A] text-sm text-white transition active:scale-[0.98]">
            AI에게 질문하기
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}

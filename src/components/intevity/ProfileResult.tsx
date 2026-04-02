"use client";

import Link from "next/link";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
import { FadeIn } from "@/components/shared/motion";
import type { StyleMatchResult } from "@/lib/data/style-mapping";
import type { ProcessRecommendation } from "@/lib/data/process-weights";

interface Props {
  radarData: { axis: string; value: number }[];
  styleDetails: { primary: StyleMatchResult; secondary?: StyleMatchResult };
  processes: ProcessRecommendation[];
  spacePriority: { space: string; score: number }[];
}

export default function ProfileResult({ radarData, styleDetails, processes, spacePriority }: Props) {
  return (
    <div className="mx-auto max-w-2xl space-y-12">
      <FadeIn className="text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6B35]">Result</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-neutral-900 md:text-4xl">
          나의 인테리어 성향
        </h1>
      </FadeIn>

      {/* Radar */}
      <FadeIn delay={0.1}>
        <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: "#6B7280" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar dataKey="value" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </FadeIn>

      {/* Style match */}
      <FadeIn delay={0.15}>
        <div className="rounded-3xl bg-neutral-950 p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6B35]">Style Match</p>
          <p className="mt-3 text-3xl font-black text-white">{styleDetails.primary.style}</p>
          <p className="mt-2 text-sm text-white/40">{styleDetails.primary.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {styleDetails.primary.keywords.map((kw) => (
              <span key={kw} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/50">{kw}</span>
            ))}
          </div>
          {styleDetails.secondary && (
            <div className="mt-6 border-t border-white/[0.06] pt-4">
              <p className="text-xs text-white/30">2순위: <span className="text-white/60">{styleDetails.secondary.style}</span></p>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Space priority */}
      <FadeIn delay={0.2}>
        <div className="rounded-3xl border border-neutral-100 bg-white p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6B35]">Space Priority</p>
          <p className="mt-2 text-lg font-bold text-neutral-900">어디에 먼저 투자할까요</p>
          <div className="mt-6 space-y-3">
            {spacePriority.slice(0, 5).map((sp, i) => (
              <div key={sp.space} className="flex items-center gap-4">
                <span className="w-4 font-mono text-xs text-neutral-300">{i + 1}</span>
                <span className="w-8 text-sm font-semibold text-neutral-800">{sp.space}</span>
                <div className="flex-1 h-2 rounded-full bg-neutral-100">
                  <div className="h-2 rounded-full bg-[#FF6B35]" style={{ width: `${sp.score}%`, opacity: 1 - i * 0.15 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Processes */}
      <FadeIn delay={0.25}>
        <div className="rounded-3xl border border-neutral-100 bg-white p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6B35]">Recommended</p>
          <p className="mt-2 text-lg font-bold text-neutral-900">추천 공정</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {processes.map((p) => (
              <span
                key={p.process}
                className={`rounded-full px-4 py-2 text-xs font-medium ${
                  p.priority === "필수"
                    ? "bg-[#FF6B35] text-white"
                    : p.priority === "권장"
                    ? "bg-[#FF6B35]/10 text-[#FF6B35]"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {p.process}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.3} className="text-center py-4">
        <p className="text-sm text-neutral-400">이 성향으로 견적서를 분석해보세요.</p>
        <Link
          href="/audit"
          className="mt-6 inline-flex rounded-full bg-[#FF6B35] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(255,107,53,0.3)]"
        >
          견적서 분석하러 가기
        </Link>
      </FadeIn>
    </div>
  );
}

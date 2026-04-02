"use client";

import Link from "next/link";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
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
    <div className="mx-auto max-w-xl space-y-16">
      <FadeIn className="text-center">
        <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">RESULT</p>
        <h1 className="mt-6 font-serif text-3xl font-light text-[#1A1A1A]">
          당신의 인테리어 성향
        </h1>
      </FadeIn>

      {/* Radar */}
      <FadeIn delay={0.15}>
        <div className="rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-8">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="65%">
              <PolarGrid stroke="rgba(26,26,26,0.06)" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "rgba(26,26,26,0.4)" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar dataKey="value" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.08} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </FadeIn>

      {/* Style */}
      <FadeIn delay={0.2}>
        <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">STYLE</p>
        <p className="mt-4 font-serif text-3xl font-bold text-[#1A1A1A]">{styleDetails.primary.style}</p>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A1A1A]/40">{styleDetails.primary.description}</p>
        {styleDetails.secondary && (
          <p className="mt-4 text-[12px] text-[#1A1A1A]/20">2순위: {styleDetails.secondary.style}</p>
        )}
      </FadeIn>

      {/* Space priority */}
      <FadeIn delay={0.25}>
        <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">SPACE PRIORITY</p>
        <div className="mt-6 space-y-4">
          {spacePriority.slice(0, 5).map((sp, i) => (
            <div key={sp.space} className="flex items-center gap-6">
              <span className="w-4 font-mono text-[11px] text-[#1A1A1A]/15">{i + 1}</span>
              <span className="w-10 text-[13px] text-[#1A1A1A]">{sp.space}</span>
              <div className="h-[2px] flex-1 bg-[#1A1A1A]/[0.04]">
                <div className="h-full bg-[#1A1A1A]/20" style={{ width: `${sp.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Processes */}
      <FadeIn delay={0.3}>
        <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">RECOMMENDED</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {processes.map((p) => (
            <span
              key={p.process}
              className={`rounded-sm px-3 py-1.5 text-[11px] ${
                p.priority === "필수"
                  ? "bg-[#1A1A1A] text-white"
                  : p.priority === "권장"
                  ? "border border-[#1A1A1A]/10 text-[#1A1A1A]/50"
                  : "text-[#1A1A1A]/20"
              }`}
            >
              {p.process}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.35} className="pt-8 text-center">
        <Link
          href="/audit"
          className="border-b border-[#1A1A1A] pb-1 text-[13px] font-medium tracking-wide text-[#1A1A1A] transition-all duration-500 hover:border-[#FF6B35] hover:text-[#FF6B35]"
        >
          이 성향으로 견적서 분석하기
        </Link>
      </FadeIn>
    </div>
  );
}

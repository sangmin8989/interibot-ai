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
        <p className="text-[9px] tracking-[0.5em] text-[#C9A96E]">RESULT</p>
        <h1 className="mt-6 font-serif text-3xl font-light text-black">당신의 성향</h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="border border-black/[0.06] p-8">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="65%">
              <PolarGrid stroke="rgba(0,0,0,0.04)" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "rgba(0,0,0,0.3)" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar dataKey="value" stroke="#C9A96E" fill="#C9A96E" fillOpacity={0.06} strokeWidth={1} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="border border-black/[0.06] bg-black p-10 text-center">
          <p className="text-[9px] tracking-[0.5em] text-[#C9A96E]/40">STYLE</p>
          <p className="mt-4 font-serif text-3xl font-light text-white">{styleDetails.primary.style}</p>
          <p className="mt-3 text-[13px] leading-[1.9] text-white/55">{styleDetails.primary.description}</p>
          {styleDetails.secondary && (
            <p className="mt-6 text-[11px] text-white/45">2순위 — {styleDetails.secondary.style}</p>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-[9px] tracking-[0.5em] text-[#C9A96E]">SPACE</p>
        <div className="mt-6 space-y-4">
          {spacePriority.slice(0, 5).map((sp, i) => (
            <div key={sp.space} className="flex items-center gap-6">
              <span className="w-4 font-mono text-[10px] text-black/40">{i + 1}</span>
              <span className="w-10 text-[12px] text-black">{sp.space}</span>
              <div className="h-[1px] flex-1 bg-black/[0.04]">
                <div className="h-full bg-[#C9A96E]/40" style={{ width: `${sp.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <p className="text-[9px] tracking-[0.5em] text-[#C9A96E]">RECOMMENDED</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {processes.map((p) => (
            <span key={p.process} className={`px-3 py-1.5 text-[10px] tracking-[0.05em] ${
              p.priority === "필수" ? "bg-black text-white" : p.priority === "권장" ? "border border-black/10 text-black/40" : "text-black/45"
            }`}>{p.process}</span>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3} className="pt-8 text-center">
        <div className="mx-auto mb-8 h-[0.5px] w-8 bg-[#C9A96E]/20" />
        <Link href="/audit" className="border-b border-black pb-1 text-[12px] tracking-[0.1em] text-black transition-all duration-500 hover:border-[#C9A96E] hover:text-[#C9A96E]">
          이 성향으로 견적서 분석하기
        </Link>
      </FadeIn>
    </div>
  );
}

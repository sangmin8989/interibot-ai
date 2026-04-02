"use client";

import Link from "next/link";
import { FadeIn, AnimatedBar } from "@/components/shared/motion";
import { DEMO_AUDIT_REPORT, DEMO_HVI, formatWon, getStatusColor } from "@/lib/demo-data";

/* Picasso: bento grid with irregular sizes, each card is a world */

export default function FeatureShowcase() {
  return (
    <section id="features" className="bg-[#FAFAF9] px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#FF6B35]/60">
            Features
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.1] tracking-tight text-neutral-900">
            네 가지 도구.
          </h2>
        </FadeIn>

        {/* Irregular bento grid */}
        <div className="mt-14 grid gap-4 md:grid-cols-12 md:grid-rows-2">

          {/* 성향분석 — tall left */}
          <FadeIn delay={0.1} className="md:col-span-5 md:row-span-2">
            <Link href="/intevity" className="group block h-full">
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-neutral-950 p-8 transition-all group-hover:scale-[1.01]">
                <span className="absolute -right-6 bottom-0 text-[12rem] font-black leading-none text-white/[0.03]">性</span>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6B35]">Personality</p>
                <h3 className="mt-4 text-2xl font-bold leading-snug text-white">
                  15가지 질문으로
                  <br />나의 인테리어
                  <br />DNA를 발견
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/40">
                  공간감각, 색감 취향, 생활 루틴을 분석하여 6가지 스타일 중 당신에게 맞는 스타일을 추천합니다.
                </p>
                {/* Mini quiz preview */}
                <div className="mt-auto pt-8">
                  <div className="space-y-2">
                    {["화이트 — 무채색", "우드톤 — 자연", "컬러 — 개성"].map((o, i) => (
                      <div key={o} className={`rounded-xl border px-3 py-2 text-xs ${
                        i === 1 ? "border-[#FF6B35]/40 bg-[#FF6B35]/10 text-white" : "border-white/[0.06] text-white/30"
                      }`}>{o}</div>
                    ))}
                  </div>
                  <div className="mt-3 h-1 rounded-full bg-white/[0.06]">
                    <div className="h-1 w-[60%] rounded-full bg-[#FF6B35]" />
                  </div>
                </div>
                <span className="mt-6 text-xs text-white/30 transition group-hover:text-[#FF6B35]">시작하기 →</span>
              </div>
            </Link>
          </FadeIn>

          {/* 견적서 감사 — wide top right */}
          <FadeIn delay={0.15} className="md:col-span-7">
            <Link href="/audit" className="group block">
              <div className="relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-8 transition-all group-hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6B35]">Audit</p>
                    <h3 className="mt-3 text-xl font-bold text-neutral-900">
                      받은 견적서, 3분 만에 검증
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-neutral-500">
                      17개 공정별 시장 백분위 위치, 누락 공정, 리스크를 분석합니다.
                    </p>
                  </div>
                  <span className="text-xs text-neutral-300 transition group-hover:text-[#FF6B35]">→</span>
                </div>
                {/* Inline mini report */}
                <div className="mt-6 space-y-1.5">
                  {DEMO_AUDIT_REPORT.processes.slice(0, 4).map((p) => {
                    const sc = getStatusColor(p.status);
                    return (
                      <div key={p.name} className="flex items-center gap-2">
                        <span className="w-10 text-[10px] font-medium text-neutral-400">{p.name.replace("공사","")}</span>
                        <div className="flex-1"><AnimatedBar percent={p.percentile} color={sc.bar} className="h-1" /></div>
                        <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${sc.bg} ${sc.text}`}>{p.status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* 집값분석 — bottom left of right section */}
          <FadeIn delay={0.2} className="md:col-span-4">
            <Link href="/hvi" className="group block">
              <div className="relative overflow-hidden rounded-3xl bg-[#FF6B35] p-8 transition-all group-hover:scale-[1.02]">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">Home Value</p>
                <h3 className="mt-3 text-xl font-bold text-white">집값 분석</h3>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-black text-white">+{formatWon(DEMO_HVI.hvi)}</span>
                </div>
                <p className="mt-1 text-xs text-white/50">예상 집값 상승</p>
                <div className="mt-4 flex gap-4">
                  <div>
                    <span className="font-mono text-lg font-bold text-white/90">{DEMO_HVI.roi}%</span>
                    <p className="text-[9px] text-white/40">ROI</p>
                  </div>
                  <div>
                    <span className="font-mono text-lg font-bold text-white/90">{DEMO_HVI.lii}</span>
                    <p className="text-[9px] text-white/40">LII</p>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* AI 상담 — bottom right */}
          <FadeIn delay={0.25} className="md:col-span-3">
            <Link href="/chat" className="group block h-full">
              <div className="flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-8 transition-all group-hover:shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF6B35]">AI Chat</p>
                <h3 className="mt-3 text-lg font-bold text-neutral-900">물어보세요</h3>
                {/* Mini chat */}
                <div className="mt-auto space-y-2 pt-6">
                  <div className="ml-auto w-fit rounded-xl bg-neutral-100 px-3 py-1.5 text-[10px] text-neutral-600">
                    32평 올수리 얼마야?
                  </div>
                  <div className="w-fit rounded-xl border-l-2 border-[#FF6B35] bg-white px-3 py-1.5 text-[10px] text-neutral-500 shadow-sm">
                    P50 기준 약 3,914만원
                  </div>
                </div>
                <span className="mt-4 text-xs text-neutral-300 transition group-hover:text-[#FF6B35]">→</span>
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

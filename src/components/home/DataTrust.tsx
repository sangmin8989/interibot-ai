"use client";

import { FadeIn, CountUp } from "@/components/shared/motion";

/* Picasso: numbers as monumental art objects */

export default function DataTrust() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 md:py-40">
      {/* Giant watermark number */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none">
        <span className="font-mono text-[25vw] font-black leading-none text-neutral-50">
          121K
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#FF6B35]/60">
            Data
          </p>
        </FadeIn>

        {/* Numbers as art — massive, weighted differently */}
        <div className="mt-12 space-y-16 md:space-y-20">
          <FadeIn delay={0.1}>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tighter text-neutral-900">
                <CountUp target={121515} />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900">건의 시장 단가 데이터</p>
                <p className="text-xs text-neutral-400">아파트 인테리어 실거래 가격</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-baseline gap-4 md:ml-24">
              <span className="font-mono text-[clamp(2.5rem,8vw,5rem)] font-black leading-none tracking-tighter text-[#FF6B35]">
                <CountUp target={450} suffix="+" />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900">실제 시공 사례</p>
                <p className="text-xs text-neutral-400">아르젠 스튜디오 현장 데이터</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex items-baseline gap-4 md:ml-48">
              <span className="font-mono text-[clamp(2rem,6vw,4rem)] font-black leading-none tracking-tighter text-neutral-300">
                <CountUp target={17} />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900">개 표준 공정 분석</p>
                <p className="text-xs text-neutral-400">철거부터 조명까지</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

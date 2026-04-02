"use client";

import { FadeIn } from "@/components/shared/motion";

export default function PainPoints() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 md:py-36">
      {/* Giant background question mark — Picasso: symbol as texture */}
      <div className="pointer-events-none absolute -right-20 top-0 select-none text-[40vw] font-black leading-none text-neutral-50">
        ?
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#FF6B35]/60">
            Problem
          </p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.1] tracking-tight text-neutral-900">
            당신이 받은 견적서,
            <br />
            <span className="text-neutral-300">정말 적정가입니까.</span>
          </h2>
        </FadeIn>

        {/* Irregular grid — Picasso: deliberate asymmetry */}
        <div className="mt-16 grid gap-4 md:grid-cols-12">
          <FadeIn delay={0.1} className="md:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl bg-neutral-950 p-8 transition-all hover:scale-[1.02]">
              <span className="absolute -right-4 -top-4 text-[8rem] font-black leading-none text-white/[0.03]">01</span>
              <p className="relative text-xs font-medium uppercase tracking-widest text-[#FF6B35]">Gap</p>
              <p className="relative mt-3 text-xl font-bold text-white">
                동일 평수, 3,000만원 차이
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-white/40">
                같은 32평 올수리인데 업체마다 가격이 다릅니다. 구조를 모르면 판단할 수 없습니다.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="md:col-span-7">
            <div className="group relative overflow-hidden rounded-3xl border border-neutral-100 bg-white p-8 transition-all hover:shadow-xl">
              <span className="absolute -right-4 -top-4 text-[8rem] font-black leading-none text-neutral-50">02</span>
              <p className="relative text-xs font-medium uppercase tracking-widest text-[#FF6B35]">Blind</p>
              <p className="relative mt-3 text-xl font-bold text-neutral-900">
                자재비, 인건비, 간접비 — 구조가 안 보인다
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-neutral-500">
                견적서를 받아도 어디가 합리적이고 어디가 과한지 비교할 기준이 없습니다.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="md:col-span-8">
            <div className="group relative overflow-hidden rounded-3xl bg-[#FAFAF9] p-8 transition-all hover:shadow-lg">
              <span className="absolute -right-4 -top-4 text-[8rem] font-black leading-none text-neutral-100/50">03</span>
              <p className="relative text-xs font-medium uppercase tracking-widest text-[#FF6B35]">Risk</p>
              <p className="relative mt-3 text-xl font-bold text-neutral-900">
                누락된 공정은 나중에 추가 비용이 됩니다
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-neutral-500">
                빠진 항목, 부풀린 항목을 전문가 없이 찾기 어렵습니다.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.35} className="flex items-center md:col-span-4">
            <a
              href="#features"
              className="group flex items-center gap-2 text-sm font-semibold text-[#FF6B35] transition hover:gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] text-white transition-transform group-hover:scale-110">
                →
              </span>
              <span>해결하기</span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

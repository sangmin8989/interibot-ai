"use client";

import { FadeIn, CountUp } from "@/components/shared/motion";

/* Hermès: numbers presented like engraved hallmarks on precious metal */

export default function DataTrust() {
  return (
    <section className="bg-white px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">DATA</p>
        </FadeIn>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-[#1A1A1A]/[0.06] bg-[#1A1A1A]/[0.04] md:grid-cols-3">
          {[
            { target: 121515, label: "시장 단가 데이터", suffix: "" },
            { target: 450, label: "시공 사례", suffix: "+" },
            { target: 17, label: "표준 공정", suffix: "" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.15}>
              <div className="bg-white px-10 py-14 text-center">
                <span className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-[#1A1A1A]">
                  <CountUp target={s.target} suffix={s.suffix} />
                </span>
                <p className="mt-2 text-[11px] tracking-[0.15em] text-[#1A1A1A]/25">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p className="mt-8 text-center text-[11px] text-[#1A1A1A]/15">
            모든 판단에 출처를 명시합니다
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

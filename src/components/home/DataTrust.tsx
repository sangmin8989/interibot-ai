"use client";

import { FadeIn, CountUp } from "@/components/shared/motion";

/* Chanel: numbers engraved in gold on black */

export default function DataTrust() {
  return (
    <section className="bg-black px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[10px] tracking-[0.5em] text-[#C9A96E]">DATA</p>
        </FadeIn>

        <div className="mt-16 grid gap-[0.5px] bg-white/[0.04] md:grid-cols-3">
          {[
            { target: 121515, label: "시장 단가 데이터", suffix: "" },
            { target: 450, label: "시공 사례", suffix: "+" },
            { target: 17, label: "표준 공정", suffix: "" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.12}>
              <div className="bg-black px-8 py-16 text-center">
                <span className="font-serif text-[clamp(2rem,4vw,3rem)] font-light tracking-tight text-[#C9A96E]">
                  <CountUp target={s.target} suffix={s.suffix} />
                </span>
                <p className="mt-3 text-[10px] tracking-[0.2em] text-white/15">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

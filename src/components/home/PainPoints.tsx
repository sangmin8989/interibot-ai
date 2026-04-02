"use client";

import { FadeIn } from "@/components/shared/motion";

/* Chanel: stark black sections, gold numbers, surgical precision */

const points = [
  { num: "01", title: "판단의 부재", desc: "견적서를 받았지만 맞는지 알 수 없습니다. 기준이 없으면 확인할 방법도 없습니다." },
  { num: "02", title: "구조의 불투명", desc: "자재, 인건비, 간접비가 어떤 비율인지. 전문가가 아니면 보이지 않습니다." },
  { num: "03", title: "보이지 않는 누락", desc: "빠진 공정은 나중에 발견됩니다. 그때는 이미 선택지가 줄어든 뒤입니다." },
];

export default function PainPoints() {
  return (
    <section className="bg-black px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[10px] tracking-[0.5em] text-[#C9A96E]">WHY</p>
          <h2 className="mt-6 max-w-md font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] font-light leading-[1.3] text-white">
            모르는 채로<br />결정하고 계십니다.
          </h2>
        </FadeIn>

        <div className="mt-20">
          {points.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.12}>
              <div className="flex gap-8 border-t border-white/[0.06] py-10 md:gap-16">
                <span className="font-mono text-[11px] text-[#C9A96E]/40">{p.num}</span>
                <div className="max-w-md">
                  <h3 className="font-serif text-lg font-normal text-white">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.9] text-white/55">{p.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { FadeIn } from "@/components/shared/motion";

/* Hermès: problems stated with the quiet authority of a connoisseur */

const points = [
  { num: "01", title: "견적의 불투명함", desc: "동일한 평수, 동일한 공정. 그런데 업체마다 수천만원이 다릅니다. 구조를 모르면 판단할 수 없습니다." },
  { num: "02", title: "기준의 부재", desc: "자재비, 인건비, 간접비. 어디가 합리적이고 어디가 과한지, 비교할 기준이 없었습니다." },
  { num: "03", title: "보이지 않는 누락", desc: "빠진 공정은 이후 추가 비용이 됩니다. 전문가 없이는 발견하기 어렵습니다." },
];

export default function PainPoints() {
  return (
    <section className="bg-white px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">PROBLEM</p>
          <h2 className="mt-6 max-w-lg font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] font-light leading-[1.3] text-[#1A1A1A]">
            견적서 한 장에<br />수천만원이 달라집니다.
          </h2>
        </FadeIn>

        <div className="mt-20 space-y-0">
          {points.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.15}>
              <div className="flex gap-8 border-t border-[#1A1A1A]/[0.06] py-10 md:gap-16">
                <span className="font-mono text-[11px] text-[#1A1A1A]/15">{p.num}</span>
                <div className="max-w-md">
                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.8] text-[#1A1A1A]/40">{p.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

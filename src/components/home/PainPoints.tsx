"use client";

import { FadeIn } from "@/components/shared/motion";

/* Not about money. About the discomfort of not knowing. */

const points = [
  { num: "01", title: "판단의 부재", desc: "견적서를 받았지만 맞는지 틀린지 알 수 없습니다. 기준이 없으면 확인할 방법도 없습니다." },
  { num: "02", title: "구조의 불투명", desc: "자재, 인건비, 간접비가 어떤 비율로 구성되었는지. 전문가가 아니면 보이지 않는 구조입니다." },
  { num: "03", title: "빠진 것을 모르는 것", desc: "누락된 공정은 이후에 발견됩니다. 그때는 이미 선택지가 줄어든 뒤입니다." },
];

export default function PainPoints() {
  return (
    <section className="bg-white px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">WHY</p>
          <h2 className="mt-6 max-w-md font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] font-light leading-[1.3] text-[#1A1A1A]">
            모르는 채로<br />결정하고 계십니다.
          </h2>
        </FadeIn>

        <div className="mt-20 space-y-0">
          {points.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.15}>
              <div className="flex gap-8 border-t border-[#1A1A1A]/[0.06] py-10 md:gap-16">
                <span className="font-mono text-[11px] text-[#1A1A1A]/12">{p.num}</span>
                <div className="max-w-md">
                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.8] text-[#1A1A1A]/35">{p.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

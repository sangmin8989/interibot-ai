"use client";

import { FadeIn, CountUp, StaggerContainer, StaggerItem } from "@/components/shared/motion";

const stats = [
  { target: 121515, label: "시장 단가 데이터", suffix: "" },
  { target: 450, label: "실제 시공 사례", suffix: "+" },
  { target: 17, label: "표준 공정 분석", suffix: "" },
];

export default function DataTrust() {
  return (
    <section className="bg-[#0A0A0A] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            데이터가 증명합니다
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <div className="text-5xl font-bold text-orange-400">
                <CountUp target={s.target} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-gray-400">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.5} className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            아르젠 스튜디오 현장 시공 데이터 기반 | 특허 출원 기술
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

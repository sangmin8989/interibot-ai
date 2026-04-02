"use client";

import { FadeIn, CountUp, StaggerContainer, StaggerItem } from "@/components/shared/motion";

const stats = [
  { target: 121515, label: "시장 단가 데이터", suffix: "건" },
  { target: 450, label: "실제 시공 사례", suffix: "건" },
  { target: 17, label: "분석 공정", suffix: "개" },
];

export default function DataTrust() {
  return (
    <section className="bg-[#0A0A0B] px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            데이터가 증명합니다
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#6B7280]">
            모든 판단에 출처를 명시합니다. 주관적 표현 없이 백분위와 데이터로만 이야기합니다.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p className="font-mono text-5xl font-bold text-[#FF6B35]">
                <CountUp target={s.target} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[#9CA3AF]">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

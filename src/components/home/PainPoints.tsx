"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";

const points = [
  {
    emoji: "😰",
    title: "업체마다 견적이 천차만별",
    desc: "같은 32평 올수리인데 3,000만원부터 8,000만원까지. 어디가 적정가인지 알 수가 없습니다.",
  },
  {
    emoji: "🤔",
    title: "뭐가 적정가인지 모름",
    desc: "자재비, 인건비, 간접비 구조를 모르면 판단이 불가능합니다. 업체 말만 믿어야 할까요?",
  },
  {
    emoji: "⚠️",
    title: "누락·과다 청구 확인 불가",
    desc: "빠진 공정, 부풀린 항목을 전문가 없이 찾기 어렵습니다. 나중에 추가 비용이 발생합니다.",
  },
];

export default function PainPoints() {
  return (
    <section className="bg-white px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            인테리어, 이런 경험 있지 않으세요?
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-3">
          {points.map((p) => (
            <StaggerItem key={p.title}>
              <div className="rounded-2xl bg-gray-50 p-8 transition-all hover:shadow-lg">
                <span className="text-4xl">{p.emoji}</span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {p.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4} className="mt-10 text-center">
          <a
            href="#features"
            className="inline-block font-semibold text-orange-500 transition hover:text-orange-600"
          >
            인테리봇 AI가 해결합니다 →
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

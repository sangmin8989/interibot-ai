"use client";

import Link from "next/link";
import { SlideIn, FadeIn } from "@/components/shared/motion";

interface Feature {
  label: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  mockup: React.ReactNode;
  reverse?: boolean;
  bg: string;
}

function FeatureBlock({ label, title, desc, cta, href, mockup, reverse, bg }: Feature) {
  return (
    <div className={bg}>
      <div
        className={`mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-24 md:py-32 lg:flex-row lg:gap-16 ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <SlideIn from={reverse ? "right" : "left"} className="flex-1">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            {label}
          </span>
          <h3 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600">
            {desc}
          </p>
          <Link
            href={href}
            className="mt-6 inline-block font-semibold text-orange-500 transition hover:text-orange-600"
          >
            {cta}
          </Link>
        </SlideIn>

        <SlideIn from={reverse ? "left" : "right"} delay={0.15} className="flex-1">
          {mockup}
        </SlideIn>
      </div>
    </div>
  );
}

// Mockups
function IntevityMockup() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🎨</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">색감 취향</span>
      </div>
      <p className="text-sm font-semibold text-gray-800">끌리는 공간 분위기는?</p>
      <div className="mt-3 space-y-2">
        {["화이트/그레이 — 깔끔한 무채색", "우드톤 — 따뜻한 자연 느낌", "컬러 포인트 — 나만의 개성"].map(
          (opt, i) => (
            <div
              key={opt}
              className={`rounded-xl border-2 px-4 py-2.5 text-sm transition ${
                i === 1
                  ? "border-orange-400 bg-orange-50 font-medium"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              {opt}
            </div>
          )
        )}
      </div>
      <div className="mt-4 h-1.5 rounded-full bg-gray-100">
        <div className="h-1.5 w-3/5 rounded-full bg-gradient-to-r from-orange-400 to-amber-400" />
      </div>
      <p className="mt-1 text-right text-xs text-gray-400">9 / 15</p>
    </div>
  );
}

function AuditMockup() {
  const rows = [
    { name: "목공사", my: "820만", p50: "790만", v: "PASS", c: "green" },
    { name: "타일공사", my: "650만", p50: "480만", v: "WARN", c: "yellow" },
    { name: "전기공사", my: "380만", p50: "210만", v: "BLOCK", c: "red" },
  ];
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-800">공정별 비교</span>
        <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">WARN</span>
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
            <span className="text-sm font-medium text-gray-700">{r.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{r.my}</span>
              <span className="text-xs text-gray-400">vs {r.p50}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                r.c === "green" ? "bg-green-100 text-green-800" : r.c === "yellow" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
              }`}>{r.v}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-gray-400">출처: 시장 450건 기준</p>
    </div>
  );
}

function HviMockup() {
  const data = [
    { name: "주방", pct: 78 },
    { name: "욕실", pct: 65 },
    { name: "바닥", pct: 48 },
    { name: "도배", pct: 35 },
  ];
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
      <p className="text-sm font-bold text-gray-800">공정별 ROI</p>
      <div className="mt-4 space-y-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-3">
            <span className="w-8 text-sm font-medium text-gray-600">{d.name}</span>
            <div className="flex-1">
              <div className="h-4 rounded-full bg-gray-100">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-orange-400 to-amber-400"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
            </div>
            <span className="w-10 text-right text-sm font-semibold text-gray-700">{d.pct}%</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-orange-50 p-3 text-center">
        <p className="text-xs text-gray-500">예상 집값 상승</p>
        <p className="text-lg font-bold text-orange-600">+1,820만원</p>
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-md bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm text-white">
            32평 올수리 보통 얼마야?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2 text-sm text-gray-700">
            32평 올수리(창호 포함, 확장 미포함) 기준 직접공사비 P50은 약 3,914만원입니다.
            <span className="mt-1 block text-[10px] text-gray-400">시장 450건 기준</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["타일 브랜드 추천", "목공사 기간은?"].map((q) => (
          <span key={q} className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
            {q}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FeatureShowcase() {
  return (
    <div id="features">
      <FeatureBlock
        label="PERSONALITY"
        title="15가지 질문으로 나만의 인테리어 DNA 발견"
        desc="공간감각, 색감 취향, 생활 루틴까지 분석하여 6가지 스타일 중 나에게 맞는 스타일과 우선 투자할 공간을 추천합니다."
        cta="무료 분석 시작 →"
        href="/intevity"
        mockup={<IntevityMockup />}
        bg="bg-white"
      />
      <FeatureBlock
        label="AUDIT"
        title="받은 견적서, 적정가인지 3분 만에 확인"
        desc="견적서를 업로드하면 17개 공정별로 시장 데이터와 비교하여 백분위 위치, 누락 공정, 리스크를 분석합니다."
        cta="견적서 분석하기 →"
        href="/audit"
        mockup={<AuditMockup />}
        reverse
        bg="bg-[#FAFAFA]"
      />
      <FeatureBlock
        label="HOME VALUE"
        title="리모델링하면 집값이 얼마나 오를까?"
        desc="국토부 실거래가와 공정별 ROI 데이터를 기반으로 투자 대비 예상 집값 상승을 분석합니다."
        cta="집값 분석 보기 →"
        href="/hvi"
        mockup={<HviMockup />}
        bg="bg-white"
      />
      <FeatureBlock
        label="AI CONSULTANT"
        title="인테리어 전문가에게 물어보세요"
        desc="9,600건 이상의 인테리어 지식 데이터를 학습한 AI가 자재, 공정, 시공 방법까지 답변합니다."
        cta="AI 상담 시작 →"
        href="/chat"
        mockup={<ChatMockup />}
        reverse
        bg="bg-[#FAFAFA]"
      />
    </div>
  );
}

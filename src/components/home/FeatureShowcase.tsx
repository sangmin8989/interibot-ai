"use client";

import Link from "next/link";
import { FadeIn, SlideIn, AnimatedBar } from "@/components/shared/motion";
import { DEMO_AUDIT_REPORT, DEMO_HVI, formatWon, getStatusColor } from "@/lib/demo-data";

/* Hermès: each feature presented like an object in a vitrine — one at a time, generous space */

export default function FeatureShowcase() {
  return (
    <div id="features">
      {/* 성향분석 */}
      <section className="bg-[#FAF9F7] px-6 py-32 md:py-40">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideIn from="left">
            <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">PERSONALITY</p>
            <h3 className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.3] text-[#1A1A1A]">
              15가지 질문으로<br />인테리어 성향을 발견합니다.
            </h3>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.8] text-[#1A1A1A]/40">
              공간감각부터 색감 취향, 생활 패턴까지. 6가지 스타일 중 당신에게 맞는 스타일과 우선 투자할 공간을 추천합니다.
            </p>
            <Link href="/intevity" className="mt-8 inline-block border-b border-[#1A1A1A]/20 pb-0.5 text-[12px] tracking-wide text-[#1A1A1A]/60 transition-all duration-500 hover:border-[#1A1A1A] hover:text-[#1A1A1A]">
              시작하기
            </Link>
          </SlideIn>

          <SlideIn from="right" delay={0.2}>
            <div className="overflow-hidden rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]">
              <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/25">Q.09</p>
              <p className="mt-4 font-serif text-lg text-[#1A1A1A]">끌리는 공간 분위기는?</p>
              <div className="mt-6 space-y-3">
                {["화이트 — 깔끔한 무채색", "우드톤 — 따뜻한 자연", "컬러 포인트 — 나만의 개성"].map((o, i) => (
                  <div key={o} className={`border-b py-3 text-[13px] transition-all ${
                    i === 1 ? "border-[#FF6B35]/30 text-[#1A1A1A]" : "border-[#1A1A1A]/[0.04] text-[#1A1A1A]/30"
                  }`}>{o}</div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* 감사 */}
      <section className="bg-white px-6 py-32 md:py-40">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideIn from="left" className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-sm border border-[#1A1A1A]/[0.06] bg-[#FAF9F7] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)]">
              <div className="border-b border-[#1A1A1A]/[0.04] px-6 py-4">
                <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/20">AUDIT REPORT</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                {DEMO_AUDIT_REPORT.processes.slice(0, 5).map((p) => {
                  const sc = getStatusColor(p.status);
                  return (
                    <div key={p.name} className="space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[12px] text-[#1A1A1A]/50">{p.name}</span>
                        <span className={`text-[10px] font-medium ${
                          p.status === "PASS" ? "text-[#1A1A1A]/20" : p.status === "WARN" ? "text-[#C68A2E]" : "text-[#C44B3F]"
                        }`}>{p.status}</span>
                      </div>
                      <AnimatedBar percent={p.percentile} color={sc.bar} />
                    </div>
                  );
                })}
              </div>
            </div>
          </SlideIn>

          <SlideIn from="right" delay={0.2} className="order-1 lg:order-2">
            <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">AUDIT</p>
            <h3 className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.3] text-[#1A1A1A]">
              받은 견적서가<br />적정가인지 확인합니다.
            </h3>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.8] text-[#1A1A1A]/40">
              17개 공정별로 시장 데이터와 비교하여 백분위 위치를 알려드립니다. 누락된 공정도 탐지합니다.
            </p>
            <Link href="/audit" className="mt-8 inline-block border-b border-[#1A1A1A]/20 pb-0.5 text-[12px] tracking-wide text-[#1A1A1A]/60 transition-all duration-500 hover:border-[#1A1A1A] hover:text-[#1A1A1A]">
              분석하기
            </Link>
          </SlideIn>
        </div>
      </section>

      {/* 집값 + AI 상담 — side by side, restrained */}
      <section className="bg-[#FAF9F7] px-6 py-32 md:py-40">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <FadeIn>
            <Link href="/hvi" className="group block">
              <div className="h-full rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-10 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]">
                <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">HOME VALUE</p>
                <h3 className="mt-6 font-serif text-xl font-light text-[#1A1A1A]">
                  리모델링 후<br />집값은 얼마나 오르는가.
                </h3>
                <div className="mt-10 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-[#1A1A1A]">+{formatWon(DEMO_HVI.hvi)}</span>
                </div>
                <div className="mt-2 flex gap-6 text-[12px] text-[#1A1A1A]/30">
                  <span>ROI {DEMO_HVI.roi}%</span>
                  <span>LII {DEMO_HVI.lii}등급</span>
                </div>
                <p className="mt-8 text-[11px] text-[#1A1A1A]/20 transition-colors duration-500 group-hover:text-[#1A1A1A]/40">
                  분석하기 →
                </p>
              </div>
            </Link>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Link href="/chat" className="group block">
              <div className="h-full rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-10 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]">
                <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">AI CONSULTANT</p>
                <h3 className="mt-6 font-serif text-xl font-light text-[#1A1A1A]">
                  9,610건의 지식으로<br />답변합니다.
                </h3>
                <div className="mt-10 space-y-3">
                  <div className="text-right">
                    <span className="inline-block rounded-sm bg-[#1A1A1A]/[0.03] px-4 py-2 text-[12px] text-[#1A1A1A]/50">
                      32평 올수리 얼마야?
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="inline-block border-l-2 border-[#FF6B35]/30 bg-white px-4 py-2 text-[12px] text-[#1A1A1A]/40">
                      P50 기준 약 3,914만원입니다.
                    </span>
                  </div>
                </div>
                <p className="mt-8 text-[11px] text-[#1A1A1A]/20 transition-colors duration-500 group-hover:text-[#1A1A1A]/40">
                  상담하기 →
                </p>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

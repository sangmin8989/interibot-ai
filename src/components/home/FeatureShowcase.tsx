"use client";

import Link from "next/link";
import { FadeIn, SlideIn, AnimatedBar } from "@/components/shared/motion";
import { DEMO_AUDIT_REPORT, DEMO_HVI, formatWon, getStatusColor } from "@/lib/demo-data";

/* Hermès: each feature is about craft, not cost. About knowing, not saving. */

export default function FeatureShowcase() {
  return (
    <div id="features">
      {/* 성향분석 */}
      <section className="bg-[#FAF9F7] px-6 py-32 md:py-40">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideIn from="left">
            <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">PERSONALITY</p>
            <h3 className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.3] text-[#1A1A1A]">
              당신이 원하는 공간이<br />무엇인지부터.
            </h3>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.9] text-[#1A1A1A]/35">
              15가지 질문이 공간감각, 생활 리듬, 미적 취향을 읽습니다. 스타일과 우선순위가 명확해집니다.
            </p>
            <Link href="/intevity" className="mt-8 inline-block border-b border-[#1A1A1A]/15 pb-0.5 text-[12px] tracking-wide text-[#1A1A1A]/40 transition-all duration-500 hover:border-[#1A1A1A] hover:text-[#1A1A1A]">
              시작하기
            </Link>
          </SlideIn>

          <SlideIn from="right" delay={0.2}>
            <div className="overflow-hidden rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)]">
              <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/20">Q.09</p>
              <p className="mt-4 font-serif text-lg text-[#1A1A1A]">끌리는 공간 분위기는?</p>
              <div className="mt-6 space-y-0">
                {["화이트 — 절제된 공간", "우드톤 — 자연의 온기", "포인트 컬러 — 자기다운 공간"].map((o, i) => (
                  <div key={o} className={`border-b py-3.5 text-[13px] transition-all duration-500 ${
                    i === 1 ? "border-[#FF6B35]/20 text-[#1A1A1A]" : "border-[#1A1A1A]/[0.04] text-[#1A1A1A]/25"
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
            <div className="overflow-hidden rounded-sm border border-[#1A1A1A]/[0.06] bg-[#FAF9F7] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)]">
              <div className="border-b border-[#1A1A1A]/[0.04] px-6 py-4">
                <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/15">AUDIT</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                {DEMO_AUDIT_REPORT.processes.slice(0, 5).map((p) => {
                  const sc = getStatusColor(p.status);
                  return (
                    <div key={p.name} className="space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[12px] text-[#1A1A1A]/40">{p.name}</span>
                        <span className={`text-[10px] ${
                          p.status === "PASS" ? "text-[#1A1A1A]/15" : p.status === "WARN" ? "text-[#C68A2E]" : "text-[#C44B3F]"
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
              견적서를 읽는<br />눈을 드립니다.
            </h3>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.9] text-[#1A1A1A]/35">
              17개 공정 각각이 시장 데이터의 어디에 위치하는지. 빠진 공정은 없는지. 기준 위에서 판단하실 수 있습니다.
            </p>
            <Link href="/audit" className="mt-8 inline-block border-b border-[#1A1A1A]/15 pb-0.5 text-[12px] tracking-wide text-[#1A1A1A]/40 transition-all duration-500 hover:border-[#1A1A1A] hover:text-[#1A1A1A]">
              분석하기
            </Link>
          </SlideIn>
        </div>
      </section>

      {/* 집값 + 상담 */}
      <section className="bg-[#FAF9F7] px-6 py-32 md:py-40">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <FadeIn>
            <Link href="/hvi" className="group block">
              <div className="h-full rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-10 transition-all duration-700 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]">
                <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">HOME VALUE</p>
                <h3 className="mt-6 font-serif text-xl font-light text-[#1A1A1A]">
                  공사 후의 가치를<br />미리 봅니다.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-[#1A1A1A]/35">
                  어떤 공정이 집의 가치에 기여하는지. 투자의 방향을 데이터로 보여드립니다.
                </p>
                <p className="mt-8 text-[11px] text-[#1A1A1A]/15 transition-colors duration-500 group-hover:text-[#1A1A1A]/35">분석하기 →</p>
              </div>
            </Link>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Link href="/chat" className="group block">
              <div className="h-full rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-10 transition-all duration-700 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]">
                <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/25">CONSULTATION</p>
                <h3 className="mt-6 font-serif text-xl font-light text-[#1A1A1A]">
                  궁금한 것이 있으시면<br />물어보십시오.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-[#1A1A1A]/35">
                  9,610건의 인테리어 지식을 학습한 AI가 자재, 공정, 시공에 대해 답변합니다.
                </p>
                <p className="mt-8 text-[11px] text-[#1A1A1A]/15 transition-colors duration-500 group-hover:text-[#1A1A1A]/35">상담하기 →</p>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

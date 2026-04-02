"use client";

import Link from "next/link";
import { FadeIn, SlideIn, AnimatedBar } from "@/components/shared/motion";
import { DEMO_AUDIT_REPORT, getStatusColor } from "@/lib/demo-data";

/* Chanel: black/white alternating sections, gold thread, geometric mockups */

export default function FeatureShowcase() {
  return (
    <div id="features">
      {/* 성향분석 — white */}
      <section className="bg-white px-6 py-32 md:py-40">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideIn from="left">
            <p className="text-[10px] tracking-[0.5em] text-[#C9A96E]">PERSONALITY</p>
            <h3 className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.3] text-black">
              당신이 원하는 공간이<br />무엇인지부터.
            </h3>
            <p className="mt-6 max-w-sm text-[14px] leading-[2] text-black/30">
              15가지 질문이 공간감각, 생활 리듬, 미적 취향을 읽습니다.
            </p>
            <Link href="/intevity" className="mt-8 inline-block border-b border-black/15 pb-0.5 text-[11px] tracking-[0.1em] text-black/30 transition-all duration-500 hover:border-black hover:text-black">
              시작하기
            </Link>
          </SlideIn>

          <SlideIn from="right" delay={0.2}>
            <div className="border border-black/[0.06] p-8">
              <p className="text-[9px] tracking-[0.3em] text-[#C9A96E]/60">Q.09</p>
              <p className="mt-4 font-serif text-lg text-black">끌리는 공간 분위기는?</p>
              <div className="mt-6">
                {["화이트 — 절제된 공간", "우드톤 — 자연의 온기", "포인트 — 자기다운 공간"].map((o, i) => (
                  <div key={o} className={`border-b py-4 text-[13px] transition-all duration-500 ${
                    i === 1 ? "border-[#C9A96E]/20 text-black" : "border-black/[0.04] text-black/50"
                  }`}>{o}</div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* 감사 — black */}
      <section className="bg-black px-6 py-32 md:py-40">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideIn from="left" className="order-2 lg:order-1">
            <div className="border border-white/[0.06] p-8">
              <p className="text-[9px] tracking-[0.3em] text-[#C9A96E]/40">REPORT</p>
              <div className="mt-6 space-y-5">
                {DEMO_AUDIT_REPORT.processes.slice(0, 5).map((p) => {
                  const sc = getStatusColor(p.status);
                  return (
                    <div key={p.name} className="space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[12px] text-white/40">{p.name}</span>
                        <span className={`text-[10px] ${
                          p.status === "PASS" ? "text-white/50" : p.status === "WARN" ? "text-[#C9A96E]" : "text-white/60"
                        }`}>{p.status}</span>
                      </div>
                      <AnimatedBar percent={p.percentile} color={p.status === "WARN" ? "bg-[#C9A96E]" : sc.bar} />
                    </div>
                  );
                })}
              </div>
            </div>
          </SlideIn>

          <SlideIn from="right" delay={0.2} className="order-1 lg:order-2">
            <p className="text-[10px] tracking-[0.5em] text-[#C9A96E]">AUDIT</p>
            <h3 className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.3] text-white">
              견적서를 읽는<br />눈을 드립니다.
            </h3>
            <p className="mt-6 max-w-sm text-[14px] leading-[2] text-white/55">
              17개 공정이 시장의 어디에 위치하는지. 빠진 항목은 없는지.
            </p>
            <Link href="/audit" className="mt-8 inline-block border-b border-white/15 pb-0.5 text-[11px] tracking-[0.1em] text-white/55 transition-all duration-500 hover:border-white hover:text-white">
              분석하기
            </Link>
          </SlideIn>
        </div>
      </section>

      {/* 집값 + 상담 — white */}
      <section className="bg-white px-6 py-32 md:py-40">
        <div className="mx-auto grid max-w-6xl gap-[1px] bg-black/[0.04] md:grid-cols-2">
          <FadeIn>
            <Link href="/hvi" className="group block bg-white p-12 transition-all duration-700">
              <p className="text-[10px] tracking-[0.5em] text-[#C9A96E]">HOME VALUE</p>
              <h3 className="mt-6 font-serif text-xl font-light text-black">
                공사 후의 가치를<br />미리 봅니다.
              </h3>
              <p className="mt-4 text-[13px] leading-[2] text-black/50">
                어떤 공정이 집의 가치에 기여하는지.
              </p>
              <p className="mt-10 text-[10px] text-black/40 transition-colors duration-500 group-hover:text-[#C9A96E]">→</p>
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Link href="/chat" className="group block bg-white p-12 transition-all duration-700">
              <p className="text-[10px] tracking-[0.5em] text-[#C9A96E]">CONSULTATION</p>
              <h3 className="mt-6 font-serif text-xl font-light text-black">
                궁금한 것이 있으시면<br />물어보십시오.
              </h3>
              <p className="mt-4 text-[13px] leading-[2] text-black/50">
                9,610건의 지식을 학습한 AI가 답변합니다.
              </p>
              <p className="mt-10 text-[10px] text-black/40 transition-colors duration-500 group-hover:text-[#C9A96E]">→</p>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

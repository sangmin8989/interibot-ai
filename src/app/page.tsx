"use client";

import Link from "next/link";
import { DEMO_AUDIT_REPORT, DEMO_HVI, formatWon, getStatusColor } from "@/lib/demo-data";
import { FadeIn, AnimatedBar, CountUp, SlideIn } from "@/components/shared/motion";

export default function Home() {
  return (
    <>
      {/* ═══ Hero: 제품을 보여준다 ═══ */}
      <section className="bg-white px-6 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <FadeIn>
            <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">INTERIBOT AI</p>
            <h1 className="mx-auto mt-6 max-w-xl font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.35] text-black">
              인테리어의 모든 답.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[14px] leading-[1.9] text-black/40">
              121,515건 시장 데이터 기반으로 견적서를 분석하고,
              성향에 맞는 스타일을 추천합니다.
            </p>
          </FadeIn>

          {/* CTA — 크고 명확하게 */}
          <FadeIn delay={0.15} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/audit"
              className="w-full rounded-sm bg-black px-8 py-4 text-center text-[13px] font-medium tracking-wide text-white transition hover:bg-black/85 sm:w-auto"
            >
              견적서 분석하기
            </Link>
            <Link
              href="/intevity"
              className="w-full rounded-sm border border-black/10 px-8 py-4 text-center text-[13px] font-medium tracking-wide text-black/60 transition hover:border-black/20 sm:w-auto"
            >
              성향분석 시작
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 제품 증거: 실제 리포트 ═══ */}
      <section className="bg-[#FAFAF9] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center">
            <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">LIVE DEMO</p>
            <h2 className="mt-4 font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] font-light text-black">
              이런 분석을 받습니다.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10">
            <div className="overflow-hidden border border-black/[0.06] bg-white shadow-sm">
              <div className="border-b border-black/[0.04] px-5 py-3 md:px-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-black/50">{DEMO_AUDIT_REPORT.apartment} · 감사 리포트</span>
                  <span className="text-[10px] font-medium text-[#C9A96E]">{DEMO_AUDIT_REPORT.data_source}</span>
                </div>
              </div>
              <div className="divide-y divide-black/[0.03]">
                {DEMO_AUDIT_REPORT.processes.map((p) => {
                  const sc = getStatusColor(p.status);
                  return (
                    <div key={p.name} className="flex items-center gap-3 px-5 py-3.5 md:px-6">
                      <span className="w-14 shrink-0 text-[12px] font-medium text-black/60">{p.name}</span>
                      <div className="flex-1"><AnimatedBar percent={p.percentile} color={sc.bar} /></div>
                      <span className="w-14 text-right font-mono text-[10px] text-black/30">{formatWon(p.amount)}</span>
                      <span className={`w-12 rounded-sm px-2 py-0.5 text-center text-[9px] font-bold ${sc.bg} ${sc.text}`}>{p.status}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-black/[0.04] px-5 py-2.5 md:px-6">
                {DEMO_AUDIT_REPORT.warnings.map((w) => (
                  <p key={w} className="text-[11px] text-amber-600">⚠ {w}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 4가지 서비스 ═══ */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="text-center">
            <h2 className="font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] font-light text-black">네 가지 도구.</h2>
          </FadeIn>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "성향분석", desc: "15가지 질문으로 나만의 인테리어 스타일과 우선 투자 공간을 발견합니다.", href: "/intevity" },
              { label: "견적서 감사", desc: "17개 공정별로 시장 데이터와 비교하여 백분위 위치와 누락 공정을 분석합니다.", href: "/audit" },
              { label: "집값 분석", desc: "리모델링 후 예상 집값 상승과 공정별 ROI를 데이터로 보여드립니다.", href: "/hvi" },
              { label: "AI 상담", desc: "9,610건 인테리어 지식 기반 AI가 자재, 공정, 시공에 대해 답변합니다.", href: "/chat" },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <Link href={s.href} className="group block h-full border border-black/[0.06] p-6 transition-all duration-300 hover:border-black/10 hover:shadow-sm active:scale-[0.98]">
                  <h3 className="text-[14px] font-medium text-black">{s.label}</h3>
                  <p className="mt-2 text-[12px] leading-[1.8] text-black/40">{s.desc}</p>
                  <p className="mt-4 text-[11px] text-black/20 transition group-hover:text-[#C9A96E]">→</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 기능 상세 — 좌우 교차 ═══ */}
      <section className="bg-[#FAFAF9] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl space-y-20 md:space-y-28">
          {/* 성향분석 */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <SlideIn from="left">
              <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">PERSONALITY</p>
              <h3 className="mt-4 font-serif text-xl font-light text-black">당신이 원하는 공간이 무엇인지부터.</h3>
              <p className="mt-3 text-[13px] leading-[1.9] text-black/40">15가지 질문이 공간감각, 생활 리듬, 미적 취향을 읽고 6가지 스타일 중 맞춤 추천합니다.</p>
              <Link href="/intevity" className="mt-5 inline-block text-[12px] text-black/40 transition hover:text-black">시작하기 →</Link>
            </SlideIn>
            <SlideIn from="right" delay={0.1}>
              <div className="border border-black/[0.06] bg-white p-6">
                <p className="text-[9px] tracking-[0.3em] text-[#C9A96E]/60">Q.09 — 색감 취향</p>
                <p className="mt-3 text-[14px] font-medium text-black">끌리는 공간 분위기는?</p>
                <div className="mt-4">
                  {["화이트 — 절제된 공간", "우드톤 — 자연의 온기", "컬러 포인트 — 자기다운 공간"].map((o, j) => (
                    <div key={o} className={`border-b py-3 text-[12px] ${j === 1 ? "border-[#C9A96E]/20 font-medium text-black" : "border-black/[0.04] text-black/35"}`}>{o}</div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>

          {/* 감사 */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <SlideIn from="left" className="order-2 lg:order-1">
              <div className="border border-black/[0.06] bg-white p-6">
                <p className="text-[9px] tracking-[0.3em] text-[#C9A96E]/60">REPORT PREVIEW</p>
                <div className="mt-4 space-y-3">
                  {DEMO_AUDIT_REPORT.processes.slice(0, 4).map((p) => {
                    const sc = getStatusColor(p.status);
                    return (
                      <div key={p.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[11px] text-black/50">{p.name}</span>
                          <span className={`text-[9px] font-medium ${p.status === "PASS" ? "text-emerald-600" : "text-amber-600"}`}>{p.status}</span>
                        </div>
                        <AnimatedBar percent={p.percentile} color={sc.bar} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </SlideIn>
            <SlideIn from="right" delay={0.1} className="order-1 lg:order-2">
              <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">AUDIT</p>
              <h3 className="mt-4 font-serif text-xl font-light text-black">견적서를 읽는 눈을 드립니다.</h3>
              <p className="mt-3 text-[13px] leading-[1.9] text-black/40">17개 공정이 시장의 어디에 위치하는지, 빠진 항목은 없는지 데이터가 보여드립니다.</p>
              <Link href="/audit" className="mt-5 inline-block text-[12px] text-black/40 transition hover:text-black">분석하기 →</Link>
            </SlideIn>
          </div>

          {/* 집값 + 상담 */}
          <div className="grid gap-4 md:grid-cols-2">
            <FadeIn>
              <Link href="/hvi" className="group block border border-black/[0.06] bg-white p-8 transition hover:shadow-sm">
                <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">HOME VALUE</p>
                <h3 className="mt-4 font-serif text-lg font-light text-black">공사 후의 가치를 미리 봅니다.</h3>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-black">+{formatWon(DEMO_HVI.hvi)}</span>
                  <span className="text-[11px] text-black/30">ROI {DEMO_HVI.roi}%</span>
                </div>
                <p className="mt-4 text-[11px] text-black/20 transition group-hover:text-[#C9A96E]">→</p>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link href="/chat" className="group block border border-black/[0.06] bg-white p-8 transition hover:shadow-sm">
                <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">CONSULTATION</p>
                <h3 className="mt-4 font-serif text-lg font-light text-black">궁금한 것이 있으시면 물어보십시오.</h3>
                <p className="mt-3 text-[13px] text-black/40">9,610건의 지식을 학습한 AI가 답변합니다.</p>
                <p className="mt-4 text-[11px] text-black/20 transition group-hover:text-[#C9A96E]">→</p>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ WHY ═══ */}
      <section className="bg-black px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center">
            <h2 className="font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] font-light text-white">
              왜 필요한가.
            </h2>
          </FadeIn>
          <div className="mt-12">
            {[
              { n: "01", t: "판단의 부재", d: "견적서를 받았지만 맞는지 알 수 없습니다. 기준이 없으면 확인할 방법도 없습니다." },
              { n: "02", t: "구조의 불투명", d: "자재, 인건비, 간접비가 어떤 비율인지. 전문가가 아니면 보이지 않습니다." },
              { n: "03", t: "보이지 않는 누락", d: "빠진 공정은 나중에 발견됩니다. 그때는 선택지가 줄어든 뒤입니다." },
            ].map((p, i) => (
              <FadeIn key={p.n} delay={i * 0.08}>
                <div className="flex gap-6 border-t border-white/[0.06] py-7">
                  <span className="font-mono text-[11px] text-[#C9A96E]/50">{p.n}</span>
                  <div>
                    <h3 className="text-[14px] font-medium text-white">{p.t}</h3>
                    <p className="mt-1.5 text-[12px] leading-[1.8] text-white/35">{p.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Data ═══ */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-[0.5px] border border-black/[0.06] bg-black/[0.04] md:grid-cols-3">
            {[
              { target: 121515, label: "시장 단가 데이터" },
              { target: 450, label: "시공 사례", suffix: "+" },
              { target: 17, label: "표준 공정" },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className="bg-white px-6 py-10 text-center md:px-8">
                  <span className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-black">
                    <CountUp target={s.target} suffix={s.suffix || ""} />
                  </span>
                  <p className="mt-2 text-[10px] tracking-[0.15em] text-black/30">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="bg-[#FAFAF9] px-6 py-20 md:py-32">
        <FadeIn className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-black">
            확신을 가지고 결정하십시오.
          </h2>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/audit"
              className="w-full rounded-sm bg-black px-8 py-4 text-center text-[13px] font-medium tracking-wide text-white transition hover:bg-black/85 sm:w-auto"
            >
              견적서 분석하기
            </Link>
            <Link
              href="/intevity"
              className="w-full rounded-sm border border-black/10 px-8 py-4 text-center text-[13px] font-medium tracking-wide text-black/60 transition hover:border-black/20 sm:w-auto"
            >
              성향분석 시작
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

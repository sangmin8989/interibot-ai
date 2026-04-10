"use client";

import Link from "next/link";
import Image from "next/image";
import { DEMO_ANALYSIS_REPORT, DEMO_HOME_ITEMS, DEMO_HVI, formatWon, getPositionStyle } from "@/lib/demo-data";
import { FadeIn, AnimatedBar, CountUp, SlideIn } from "@/components/shared/motion";

/* ── Unsplash images (free license) ── */
const IMG = {
  hero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80",
  audit: "https://images.unsplash.com/photo-1556156653-e5a7c69cc263?auto=format&fit=crop&w=800&q=80",
  style: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  hvi: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
  chat: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80",
};

/* ── SVG icons for service cards ── */
function IconPersonality() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
function IconAudit() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}
function IconHomeValue() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-16">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMG.hero}
            alt="Modern interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
        </div>

        <div className="w-full max-w-5xl text-center">
          <FadeIn>
            <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">INTERIBOT AI</p>
            <h1 className="mx-auto mt-6 max-w-md font-serif text-4xl font-light leading-tight text-black [word-break:keep-all] lg:max-w-xl lg:text-5xl">
              인테리어의 모든 답.
            </h1>
            <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-black/50 [word-break:keep-all] lg:max-w-md">
              121,515건 시장 데이터 기반으로 견적서를 분석하고, 성향에 맞는 스타일을 추천합니다.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-10 flex flex-col items-center gap-3 lg:flex-row lg:justify-center">
            <Link
              href="/audit"
              className="flex h-14 w-[72dvw] items-center justify-center rounded-full bg-black text-base font-semibold text-white transition active:scale-[0.97] lg:w-auto lg:rounded-sm lg:px-8"
            >
              견적서 분석하기
            </Link>
            <Link
              href="/intevity"
              className="flex h-14 w-[72dvw] items-center justify-center rounded-full border border-black/15 bg-white/60 text-base font-medium text-black/70 backdrop-blur-sm transition active:scale-[0.97] lg:w-auto lg:rounded-sm lg:px-8"
            >
              성향분석 시작
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Live Demo ═══ */}
      <section className="bg-[#FAFAF9] px-4 py-12 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center">
            <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">LIVE DEMO</p>
            <h2 className="mt-4 font-serif text-2xl font-light text-black [word-break:keep-all] lg:text-3xl">
              이런 분석을 받습니다.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 lg:mt-10">
            <div className="overflow-hidden rounded-lg border border-black/[0.06] bg-white shadow-sm lg:rounded-sm">
              <div className="border-b border-black/[0.04] px-4 py-3 lg:px-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-black/50">래미안 32평</span>
                  <span className="text-[10px] font-medium text-[#C9A96E]">{DEMO_ANALYSIS_REPORT.sampleBasis}</span>
                </div>
              </div>
              <div className="divide-y divide-black/[0.03]">
                {DEMO_HOME_ITEMS.map((item) => {
                  const ps = getPositionStyle(item.position);
                  return (
                    <div key={item.processName} className="flex items-center gap-2.5 px-4 py-3 lg:gap-3 lg:px-6 lg:py-3.5">
                      <span className="w-12 shrink-0 text-xs font-medium text-black/60 lg:w-14">{item.processName}</span>
                      <div className="flex-1"><AnimatedBar percent={Math.round(item.positionRatio * 100)} color={ps.bar} /></div>
                      <span className="hidden font-mono text-[10px] text-black/30 sm:block">{formatWon(item.userAmount)}</span>
                      <span className={`rounded-sm px-2 py-0.5 text-[9px] font-bold ${ps.bg} ${ps.text}`}>{ps.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-black/[0.04] px-4 py-2.5 lg:px-6">
                {DEMO_ANALYSIS_REPORT.missingProcesses.slice(0, 1).map((m) => (
                  <p key={m.processName} className="text-[11px] text-[#1A1A1A]/50 [word-break:keep-all]">⚠ {m.processName}: {m.reason}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 4가지 서비스 ═══ */}
      <section className="bg-white px-4 py-12 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="text-center">
            <h2 className="font-serif text-2xl font-light text-black lg:text-3xl">네 가지 도구.</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-black/40">인테리어 결정에 필요한 모든 것을 데이터로 제공합니다.</p>
          </FadeIn>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-4">
            {[
              { label: "성향분석", desc: "15가지 질문으로 나만의 인테리어 스타일과 우선 투자 공간을 발견합니다.", href: "/intevity", icon: <IconPersonality /> },
              { label: "견적서 감사", desc: "17개 공정별로 시장 데이터와 비교하여 백분위 위치와 누락 공정을 분석합니다.", href: "/audit", icon: <IconAudit /> },
              { label: "집값 분석", desc: "리모델링 후 예상 집값 상승과 공정별 ROI를 데이터로 보여드립니다.", href: "/hvi", icon: <IconHomeValue /> },
              { label: "AI 상담", desc: "9,610건 인테리어 지식 기반 AI가 자재, 공정, 시공에 대해 답변합니다.", href: "/chat", icon: <IconChat /> },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.06}>
                <Link href={s.href} className="group flex h-full flex-col rounded-lg border border-black/[0.06] p-5 transition-all active:scale-[0.98] lg:rounded-sm lg:p-6 lg:hover:border-black/10 lg:hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A96E]/10 text-[#C9A96E]">
                    {s.icon}
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-black">{s.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-black/40 [word-break:keep-all]">{s.desc}</p>
                  <p className="mt-auto pt-4 text-xs text-black/20 transition group-hover:text-[#C9A96E]">→</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 기능 상세 — 좌우 교차 ═══ */}
      <section className="bg-[#FAFAF9] px-4 py-12 lg:py-24">
        <div className="mx-auto max-w-5xl space-y-16 lg:space-y-28">
          {/* 성향분석 */}
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <SlideIn from="left">
              <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">PERSONALITY</p>
              <h3 className="mt-4 font-serif text-xl font-light text-black [word-break:keep-all] lg:text-2xl">당신이 원하는 공간이 무엇인지부터.</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/40 [word-break:keep-all]">15가지 질문이 공간감각, 생활 리듬, 미적 취향을 읽고 6가지 스타일 중 맞춤 추천합니다.</p>
              <Link href="/intevity" className="mt-5 inline-block py-2 text-sm text-black/40 transition hover:text-black active:scale-[0.97]">시작하기 →</Link>
            </SlideIn>
            <SlideIn from="right" delay={0.1}>
              <div className="overflow-hidden rounded-lg border border-black/[0.06] bg-white lg:rounded-sm">
                <div className="relative h-36 w-full lg:h-44">
                  <Image src={IMG.style} alt="Interior styling" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
                </div>
                <div className="p-5 lg:p-6">
                  <p className="text-[9px] tracking-[0.3em] text-[#C9A96E]/60">Q.09 — 색감 취향</p>
                  <p className="mt-3 text-sm font-semibold text-black">끌리는 공간 분위기는?</p>
                  <div className="mt-4">
                    {["화이트 — 절제된 공간", "우드톤 — 자연의 온기", "컬러 포인트 — 자기다운 공간"].map((o, j) => (
                      <div key={o} className={`border-b py-3 text-sm ${j === 1 ? "border-[#C9A96E]/20 font-medium text-black" : "border-black/[0.04] text-black/35"}`}>{o}</div>
                    ))}
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* 감사 — reversed */}
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <SlideIn from="left" className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-lg border border-black/[0.06] bg-white lg:rounded-sm">
                <div className="relative h-36 w-full lg:h-44">
                  <Image src={IMG.audit} alt="Blueprint analysis" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
                </div>
                <div className="p-5 lg:p-6">
                  <p className="text-[9px] tracking-[0.3em] text-[#C9A96E]/60">REPORT PREVIEW</p>
                  <div className="mt-4 space-y-3">
                    {DEMO_HOME_ITEMS.slice(0, 4).map((item) => {
                      const ps = getPositionStyle(item.position);
                      return (
                        <div key={item.processName} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-black/50">{item.processName}</span>
                            <span className={`text-[10px] font-medium ${ps.text}`}>{ps.label}</span>
                          </div>
                          <AnimatedBar percent={Math.round(item.positionRatio * 100)} color={ps.bar} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SlideIn>
            <SlideIn from="right" delay={0.1} className="order-1 lg:order-2">
              <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">AUDIT</p>
              <h3 className="mt-4 font-serif text-xl font-light text-black [word-break:keep-all] lg:text-2xl">견적서를 읽는 눈을 드립니다.</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/40 [word-break:keep-all]">17개 공정이 시장의 어디에 위치하는지, 빠진 항목은 없는지 데이터가 보여드립니다.</p>
              <Link href="/audit" className="mt-5 inline-block py-2 text-sm text-black/40 transition hover:text-black active:scale-[0.97]">분석하기 →</Link>
            </SlideIn>
          </div>

          {/* 집값 + 상담 */}
          <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
            <FadeIn>
              <Link href="/hvi" className="group block overflow-hidden rounded-lg border border-black/[0.06] bg-white transition active:scale-[0.98] lg:rounded-sm lg:hover:shadow-md">
                <div className="relative h-40 w-full">
                  <Image src={IMG.hvi} alt="Home value" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                </div>
                <div className="p-6 lg:p-8">
                  <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">HOME VALUE</p>
                  <h3 className="mt-4 font-serif text-lg font-light text-black [word-break:keep-all]">공사 후의 가치를 미리 봅니다.</h3>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-serif text-2xl text-black">+{formatWon(DEMO_HVI.hvi)}</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">ROI {DEMO_HVI.roi}%</span>
                  </div>
                  <p className="mt-4 text-xs text-black/20 transition group-hover:text-[#C9A96E]">→</p>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link href="/chat" className="group block overflow-hidden rounded-lg border border-black/[0.06] bg-white transition active:scale-[0.98] lg:rounded-sm lg:hover:shadow-md">
                <div className="relative h-40 w-full">
                  <Image src={IMG.chat} alt="AI consultation" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                </div>
                <div className="p-6 lg:p-8">
                  <p className="text-[10px] tracking-[0.4em] text-[#C9A96E]">CONSULTATION</p>
                  <h3 className="mt-4 font-serif text-lg font-light text-black [word-break:keep-all]">궁금한 것이 있으시면 물어보십시오.</h3>
                  <p className="mt-3 text-sm text-black/40">9,610건의 지식을 학습한 AI가 답변합니다.</p>
                  <p className="mt-4 text-xs text-black/20 transition group-hover:text-[#C9A96E]">→</p>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ WHY ═══ */}
      <section className="bg-black px-4 py-12 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="text-center">
            <h2 className="font-serif text-2xl font-light text-white lg:text-3xl">왜 필요한가.</h2>
          </FadeIn>
          <div className="mt-10 lg:mt-12">
            {[
              { n: "01", t: "판단의 부재", d: "견적서를 받았지만 맞는지 알 수 없습니다. 기준이 없으면 확인할 방법도 없습니다." },
              { n: "02", t: "구조의 불투명", d: "자재, 인건비, 간접비가 어떤 비율인지. 전문가가 아니면 보이지 않습니다." },
              { n: "03", t: "보이지 않는 누락", d: "빠진 공정은 나중에 발견됩니다. 그때는 선택지가 줄어든 뒤입니다." },
            ].map((p, i) => (
              <FadeIn key={p.n} delay={i * 0.06}>
                <div className="flex gap-5 border-t border-white/[0.06] py-6 lg:gap-8 lg:py-7">
                  <span className="font-mono text-xs text-[#C9A96E]/50">{p.n}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{p.t}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/40 [word-break:keep-all]">{p.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Data ═══ */}
      <section className="bg-white px-4 py-12 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-[0.5px] overflow-hidden rounded-lg border border-black/[0.06] bg-black/[0.04] md:grid-cols-3 lg:rounded-sm">
            {[
              { target: 121515, label: "시장 단가 데이터" },
              { target: 450, label: "시공 사례", suffix: "+" },
              { target: 17, label: "표준 공정" },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.06}>
                <div className="bg-white px-4 py-8 text-center lg:px-8 lg:py-10">
                  <span className="font-serif text-3xl font-light text-black lg:text-4xl">
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
      <section className="relative overflow-hidden px-4 py-16 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[#FAFAF9]" />
        <FadeIn className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-2xl font-light text-black [word-break:keep-all] lg:text-3xl">
            확신을 가지고 결정하십시오.
          </h2>
          <div className="mt-10 flex flex-col items-center gap-3 lg:flex-row lg:justify-center">
            <Link
              href="/audit"
              className="flex h-14 w-[72dvw] items-center justify-center rounded-full bg-black text-base font-semibold text-white transition active:scale-[0.97] lg:w-auto lg:rounded-sm lg:px-8"
            >
              견적서 분석하기
            </Link>
            <Link
              href="/intevity"
              className="flex h-14 w-[72dvw] items-center justify-center rounded-full border border-black/10 text-base font-medium text-black/60 transition active:scale-[0.97] lg:w-auto lg:rounded-sm lg:px-8"
            >
              성향분석 시작
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

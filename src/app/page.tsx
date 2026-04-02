"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { DEMO_AUDIT_REPORT, formatWon, getStatusColor } from "@/lib/demo-data";
import { AnimatedBar, FadeIn, CountUp } from "@/components/shared/motion";
import MagneticButton from "@/components/shared/MagneticButton";
import SplitText from "@/components/shared/SplitText";
import VelocityMarquee from "@/components/shared/VelocityMarquee";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Interactive Room ── */
const roomParts = [
  { id: "sofa", label: "목공사", data: "P50: 790만", x: "12%", y: "62%", w: "28%", h: "25%" },
  { id: "window", label: "창호공사", data: "P50: 420만", x: "36%", y: "18%", w: "28%", h: "52%" },
  { id: "tv", label: "전기공사", data: "P50: 210만", x: "67%", y: "48%", w: "22%", h: "28%" },
  { id: "floor", label: "바닥공사", data: "P50: 450만", x: "5%", y: "88%", w: "90%", h: "12%" },
  { id: "lamp", label: "조명공사", data: "P50: 180만", x: "18%", y: "10%", w: "12%", h: "20%" },
];

function InteractiveRoom() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0f0f1a]">
      {/* SVG Room */}
      <svg viewBox="0 0 600 360" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="p-flr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3a2e24"/><stop offset="100%" stopColor="#2a2018"/></linearGradient>
          <linearGradient id="p-wl" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e1e2e"/><stop offset="100%" stopColor="#161622"/></linearGradient>
          <linearGradient id="p-lamp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4764B" stopOpacity="0.5"/><stop offset="100%" stopColor="#D4764B" stopOpacity="0"/></linearGradient>
        </defs>
        <rect x="30" y="50" width="540" height="270" rx="2" fill="url(#p-wl)" opacity="0.6"/>
        <g opacity="0.12"><rect x="35" y="55" width="530" height="3" rx="1" fill="#4a4a5a"/><rect x="35" y="310" width="530" height="3" rx="1" fill="#4a4a5a"/></g>
        <path d="M30,320 L570,320 L570,360 L30,360 Z" fill="url(#p-flr)" opacity="0.8"/>
        <g opacity="0.08" stroke="#5a4a3a" strokeWidth="0.5">{[30,70,110,150,190,230,270,310,350,390,430,470,510,550].map(x=><line key={x} x1={x} y1="320" x2={x+40} y2="360"/>)}</g>
        <rect x="220" y="70" width="160" height="210" rx="1" fill="none" stroke="#3a3a50" strokeWidth="0.5"/>
        <path d="M220,70 Q300,55 380,70" fill="none" stroke="#3a3a50" strokeWidth="0.5"/>
        <line x1="300" y1="70" x2="300" y2="280" stroke="#3a3a50" strokeWidth="0.3"/><line x1="220" y1="175" x2="380" y2="175" stroke="#3a3a50" strokeWidth="0.3"/>
        <circle cx="293" cy="178" r="3" fill="#5a5a6a"/><circle cx="307" cy="178" r="3" fill="#5a5a6a"/>
        <path d="M60,240 Q60,220 80,220 L190,220 Q210,220 210,240 L210,316 L60,316 Z" fill="#1e1e2a" stroke="#D4764B" strokeWidth="0.6" opacity="0.85"/>
        <rect x="72" y="228" width="52" height="35" rx="3" fill="#2a2a3a"/><rect x="134" y="236" width="52" height="18" rx="3" fill="#2a2a3a"/>
        <rect x="66" y="210" width="134" height="10" rx="4" fill="#D4764B" opacity="0.15"/>
        <rect x="400" y="180" width="130" height="100" rx="2" fill="#1e1e2a" stroke="#3a3a50" strokeWidth="0.5"/>
        <rect x="406" y="186" width="118" height="70" rx="1" fill="#161622"/>
        <ellipse cx="465" cy="221" rx="16" ry="16" fill="none" stroke="#D4764B" strokeWidth="0.5" opacity="0.35"/>
        <ellipse cx="480" cy="120" rx="32" ry="45" fill="#1a3a2a" opacity="0.7"/>
        <ellipse cx="474" cy="113" rx="22" ry="32" fill="#2a5a3a" opacity="0.5"/>
        <rect x="478" y="158" width="5" height="28" rx="2.5" fill="#3a2e24"/>
        <line x1="130" y1="50" x2="130" y2="105" stroke="#3a3a4a" strokeWidth="0.5"/>
        <path d="M105,105 Q130,95 155,105" fill="none" stroke="#D4764B" strokeWidth="0.8" opacity="0.65"/>
        <ellipse cx="130" cy="112" rx="32" ry="50" fill="url(#p-lamp)" opacity="0.45"/>
        <circle cx="130" cy="105" r="2.5" fill="#D4764B" opacity="0.9"/>
        <circle cx="80" cy="90" r="2" fill="#D4764B" style={{ animation: "iv-floatOrb 5s ease infinite" }}/>
        <circle cx="530" cy="80" r="1.5" fill="#c9956e" style={{ animation: "iv-floatOrb 4s ease 1s infinite" }}/>
      </svg>

      {/* Glow */}
      <div className="pointer-events-none absolute right-[15%] top-[10%] h-[120px] w-[120px] rounded-full bg-[#D4764B] opacity-[0.12] blur-[40px]" style={{ animation: "iv-glowPulse 4s ease infinite" }}/>

      {/* Tap zones — THE INNOVATION: room is the interface */}
      {roomParts.map((p) => (
        <button
          key={p.id}
          onClick={() => setActive(active === p.id ? null : p.id)}
          className="absolute"
          style={{ left: p.x, top: p.y, width: p.w, height: p.h }}
        >
          {/* Pulse indicator */}
          <span className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
            active === p.id ? "bg-[#C9A96E] scale-150" : "bg-[#C9A96E]/40"
          }`}>
            {active !== p.id && <span className="absolute inset-0 animate-ping rounded-full bg-[#C9A96E]/30" />}
          </span>
        </button>
      ))}

      {/* Tooltip */}
      <AnimatePresence>
        {active && (() => {
          const p = roomParts.find(r => r.id === active)!;
          return (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25, ease }}
              className="absolute z-20 rounded-sm border border-white/[0.08] bg-black/80 px-3 py-2 backdrop-blur-md"
              style={{ left: p.x, top: `calc(${p.y} - 48px)` }}
            >
              <p className="text-[10px] font-medium text-[#C9A96E]">{p.label}</p>
              <p className="font-mono text-[12px] text-white/80">{p.data}</p>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

/* ── Mobile swipeable cards ── */
const services = [
  { label: "성향분석", desc: "15가지 질문으로\n나만의 스타일 발견", href: "/intevity", accent: "bg-[#C9A96E]" },
  { label: "견적서 감사", desc: "17개 공정별\n시장 백분위 비교", href: "/audit", accent: "bg-black" },
  { label: "집값 분석", desc: "리모델링 후\n예상 가치 상승", href: "/hvi", accent: "bg-[#C9A96E]" },
  { label: "AI 상담", desc: "9,610건 지식 기반\n전문 답변", href: "/chat", accent: "bg-black" },
];

export default function Home() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const roomScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);
  const roomOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);

  return (
    <div ref={scrollRef}>
      {/* ═══ Screen 1: The room IS the hero ═══ */}
      <section className="relative flex min-h-screen flex-col bg-white">
        {/* Room — full width on mobile, takes center stage */}
        <motion.div
          className="relative w-full flex-1"
          style={{ scale: roomScale, opacity: roomOpacity }}
        >
          <div className="absolute inset-0 flex items-center justify-center px-4 pt-16">
            <div className="w-full max-w-3xl overflow-hidden rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]">
              <InteractiveRoom />
            </div>
          </div>
        </motion.div>

        {/* Overlay text — minimal, over the room */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease }}
            className="pointer-events-auto text-center"
          >
            <p className="text-[9px] tracking-[0.5em] text-[#C9A96E]">INTERIBOT AI</p>
            <h1 className="mt-3 font-serif text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-black">
              인테리어의 모든 답.
            </h1>
            <p className="mt-3 text-[13px] text-black/30">공간을 탭해서 확인하세요</p>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <div className="h-8 w-[1px] animate-pulse bg-gradient-to-b from-transparent to-black/20" />
        </motion.div>
      </section>

      {/* ═══ Screen 2: Live audit proof ═══ */}
      <section className="bg-white px-6 py-20 md:py-32">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <p className="text-[9px] tracking-[0.5em] text-[#C9A96E]">LIVE PROOF</p>
            <h2 className="mt-4 font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] font-light text-black">
              이런 분석을 받습니다.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-10">
            <div className="overflow-hidden border border-black/[0.06] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]">
              <div className="border-b border-black/[0.04] px-5 py-3">
                <span className="text-[10px] tracking-[0.2em] text-black/30">AUDIT REPORT — {DEMO_AUDIT_REPORT.apartment}</span>
              </div>
              <div className="divide-y divide-black/[0.03]">
                {DEMO_AUDIT_REPORT.processes.map((p) => {
                  const sc = getStatusColor(p.status);
                  return (
                    <div key={p.name} className="flex items-center gap-3 px-5 py-3.5">
                      <span className="w-14 shrink-0 text-[12px] text-black/50">{p.name}</span>
                      <div className="flex-1"><AnimatedBar percent={p.percentile} color={sc.bar} /></div>
                      <span className="w-12 text-right font-mono text-[10px] text-black/25">{formatWon(p.amount)}</span>
                      <span className={`rounded-sm px-2 py-0.5 text-[9px] font-bold ${sc.bg} ${sc.text}`}>{p.status}</span>
                    </div>
                  );
                })}
              </div>
              <div className="px-5 py-2.5 text-[9px] text-black/15">{DEMO_AUDIT_REPORT.data_source}</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Marquee band ═══ */}
      <div className="overflow-hidden border-y border-black/[0.04] py-3">
        <VelocityMarquee baseVelocity={0.6} className="text-[10px] tracking-[0.4em] text-black/10">
          AUDIT · PERSONALITY · HOME VALUE · CONSULTATION · 121,515 DATA · 450 CASES ·
        </VelocityMarquee>
      </div>

      {/* ═══ Screen 3: Services — horizontal scroll on mobile ═══ */}
      <section className="bg-white px-6 py-20 md:py-32">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <p className="text-[9px] tracking-[0.5em] text-[#C9A96E]">SERVICES</p>
            <h2 className="mt-4 font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] font-light text-black">네 가지 도구.</h2>
          </FadeIn>
        </div>

        {/* Mobile: horizontal scroll. Desktop: grid */}
        <div className="mt-10 flex gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-auto md:grid md:max-w-5xl md:grid-cols-4 md:overflow-visible md:px-0">
          {services.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <Link href={s.href} className="group block w-[260px] shrink-0 md:w-auto">
                <div className="flex h-full flex-col border border-black/[0.06] p-7 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] active:scale-[0.98]">
                  <div className={`h-1 w-6 rounded-full ${s.accent} opacity-40`} />
                  <h3 className="mt-5 text-[15px] font-medium text-black">{s.label}</h3>
                  <p className="mt-2 whitespace-pre-line text-[12px] leading-[1.7] text-black/35">{s.desc}</p>
                  <p className="mt-auto pt-6 text-[10px] text-black/15 transition-colors duration-500 group-hover:text-[#C9A96E]">→</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ Screen 4: Data — monumental numbers ═══ */}
      <section className="bg-black px-6 py-20 md:py-32">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <p className="text-[9px] tracking-[0.5em] text-[#C9A96E]">DATA</p>
          </FadeIn>
          <div className="mt-12 grid gap-[0.5px] bg-white/[0.04] md:grid-cols-3">
            {[
              { target: 121515, label: "시장 단가 데이터" },
              { target: 450, label: "시공 사례", suffix: "+" },
              { target: 17, label: "표준 공정" },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="bg-black px-6 py-14 text-center md:px-10">
                  <span className="font-serif text-[clamp(2rem,5vw,3rem)] font-light text-[#C9A96E]">
                    <CountUp target={s.target} suffix={s.suffix || ""} />
                  </span>
                  <p className="mt-2 text-[10px] tracking-[0.2em] text-white/30">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Screen 5: Final ═══ */}
      <section className="bg-white px-6 py-28 md:py-40">
        <FadeIn className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-8 h-[0.5px] w-8 bg-[#C9A96E]/30" />
          <p className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] font-light text-black">
            확신을 가지고<br />결정하십시오.
          </p>
          <div className="mt-12">
            <MagneticButton>
              <Link
                href="/audit"
                className="inline-block border-b border-black px-2 py-2 pb-1 text-[12px] font-medium tracking-[0.1em] text-black transition-all duration-500 hover:border-[#C9A96E] hover:text-[#C9A96E]"
              >
                시작하기
              </Link>
            </MagneticButton>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

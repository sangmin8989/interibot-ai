"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "@/components/shared/SplitText";
import MagneticButton from "@/components/shared/MagneticButton";
import DisplacementCanvas from "@/components/shared/DisplacementCanvas";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── SVG Room (cinematic draw-in) ── */
function RoomIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0f0f1a]">
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full opacity-[0.06]">
        <g stroke="#D4764B" strokeWidth="0.8" fill="none" opacity="0.6">
          <path d="M0,400 Q150,250 300,100 Q450,250 600,400" style={{ strokeDasharray: 1500, animation: "iv-drawPath 3s ease both" }}/>
          <path d="M50,400 Q200,280 300,150 Q400,280 550,400" style={{ strokeDasharray: 1500, animation: "iv-drawPath 3s ease .2s both" }}/>
          <path d="M100,400 Q220,310 300,200 Q380,310 500,400" style={{ strokeDasharray: 1500, animation: "iv-drawPath 3s ease .4s both" }}/>
          <path d="M150,400 Q240,330 300,250 Q360,330 450,400" style={{ strokeDasharray: 1500, animation: "iv-drawPath 3s ease .6s both" }}/>
          <line x1="0" y1="350" x2="600" y2="350" opacity="0.25"/>
          <line x1="40" y1="300" x2="560" y2="300" opacity="0.15"/>
        </g>
      </svg>
      <svg viewBox="0 0 600 360" className="absolute bottom-0 left-0 right-0 h-[85%] w-full">
        <defs>
          <linearGradient id="h-flr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3a2e24"/><stop offset="100%" stopColor="#2a2018"/></linearGradient>
          <linearGradient id="h-wl" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e1e2e"/><stop offset="100%" stopColor="#161622"/></linearGradient>
          <linearGradient id="h-lamp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4764B" stopOpacity="0.5"/><stop offset="100%" stopColor="#D4764B" stopOpacity="0"/></linearGradient>
        </defs>
        <motion.rect x="30" y="50" width="540" height="270" rx="2" fill="url(#h-wl)" opacity="0.6" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1.5, ease }}/>
        <g opacity="0.12"><rect x="35" y="55" width="530" height="3" rx="1" fill="#4a4a5a"/><rect x="35" y="310" width="530" height="3" rx="1" fill="#4a4a5a"/></g>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1, ease }}>
          <path d="M30,320 L570,320 L570,360 L30,360 Z" fill="url(#h-flr)" opacity="0.8"/>
          <g opacity="0.08" stroke="#5a4a3a" strokeWidth="0.5">{[30,70,110,150,190,230,270,310,350,390,430,470,510,550].map(x=><line key={x} x1={x} y1="320" x2={x+40} y2="360"/>)}</g>
        </motion.g>
        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease }}>
          <rect x="220" y="70" width="160" height="210" rx="1" fill="none" stroke="#3a3a50" strokeWidth="0.5"/>
          <path d="M220,70 Q300,55 380,70" fill="none" stroke="#3a3a50" strokeWidth="0.5"/>
          <line x1="300" y1="70" x2="300" y2="280" stroke="#3a3a50" strokeWidth="0.3"/>
          <line x1="220" y1="175" x2="380" y2="175" stroke="#3a3a50" strokeWidth="0.3"/>
          <circle cx="293" cy="178" r="3" fill="#5a5a6a"/><circle cx="307" cy="178" r="3" fill="#5a5a6a"/>
        </motion.g>
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 1, ease }}>
          <path d="M60,240 Q60,220 80,220 L190,220 Q210,220 210,240 L210,316 L60,316 Z" fill="#1e1e2a" stroke="#D4764B" strokeWidth="0.6" opacity="0.85"/>
          <rect x="72" y="228" width="52" height="35" rx="3" fill="#2a2a3a"/><rect x="134" y="236" width="52" height="18" rx="3" fill="#2a2a3a"/>
          <rect x="66" y="210" width="134" height="10" rx="4" fill="#D4764B" opacity="0.15"/>
        </motion.g>
        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1, ease }}>
          <rect x="400" y="180" width="130" height="100" rx="2" fill="#1e1e2a" stroke="#3a3a50" strokeWidth="0.5"/>
          <rect x="406" y="186" width="118" height="70" rx="1" fill="#161622"/>
          <ellipse cx="465" cy="221" rx="16" ry="16" fill="none" stroke="#D4764B" strokeWidth="0.5" opacity="0.35"/>
          <ellipse cx="465" cy="221" rx="6" ry="6" fill="#D4764B" opacity="0.12"/>
        </motion.g>
        <motion.g initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }}>
          <ellipse cx="480" cy="120" rx="32" ry="45" fill="#1a3a2a" opacity="0.7"/>
          <ellipse cx="474" cy="113" rx="22" ry="32" fill="#2a5a3a" opacity="0.5"/>
          <rect x="478" y="158" width="5" height="28" rx="2.5" fill="#3a2e24"/>
        </motion.g>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8, ease }}>
          <line x1="130" y1="50" x2="130" y2="105" stroke="#3a3a4a" strokeWidth="0.5"/>
          <path d="M105,105 Q130,95 155,105" fill="none" stroke="#D4764B" strokeWidth="0.8" opacity="0.65"/>
          <ellipse cx="130" cy="112" rx="32" ry="50" fill="url(#h-lamp)" opacity="0.45"/>
          <circle cx="130" cy="105" r="2.5" fill="#D4764B" opacity="0.9"/>
        </motion.g>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8, ease }}>
          <line x1="470" y1="50" x2="470" y2="95" stroke="#3a3a4a" strokeWidth="0.5"/>
          <circle cx="470" cy="100" r="10" fill="none" stroke="#D4764B" strokeWidth="0.5" opacity="0.45"/>
          <circle cx="470" cy="100" r="2.5" fill="#D4764B" opacity="0.55"/>
          <ellipse cx="470" cy="108" rx="20" ry="40" fill="url(#h-lamp)" opacity="0.25"/>
        </motion.g>
        <circle cx="80" cy="90" r="2" fill="#D4764B" style={{ animation: "iv-floatOrb 5s ease infinite" }}/>
        <circle cx="530" cy="80" r="1.5" fill="#c9956e" style={{ animation: "iv-floatOrb 4s ease 1s infinite" }}/>
        <circle cx="300" cy="60" r="1.5" fill="#D4764B" style={{ animation: "iv-floatOrb 6s ease 2s infinite" }}/>
      </svg>
      <div className="pointer-events-none absolute right-[15%] top-[10%] h-[150px] w-[150px] rounded-full bg-[#D4764B] opacity-[0.12] blur-[50px]" style={{ animation: "iv-glowPulse 4s ease infinite" }}/>
      <div className="pointer-events-none absolute left-[10%] top-[25%] h-[120px] w-[120px] rounded-full bg-[#c9956e] opacity-[0.08] blur-[40px]" style={{ animation: "iv-glowPulse 4s ease 1.5s infinite" }}/>
      <div className="pointer-events-none absolute bottom-[20%] left-[45%] h-[100px] w-[100px] rounded-full bg-[#D4764B] opacity-[0.06] blur-[40px]" style={{ animation: "iv-glowPulse 5s ease 0.8s infinite" }}/>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  // Parallax: room moves slower than text
  const roomY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const roomScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:pt-36">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Left: SplitText typography */}
          <motion.div className="relative z-10 lg:col-span-5" style={{ y: textY }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease }}
              className="text-[10px] tracking-[0.5em] text-[#C9A96E]"
            >
              INFORMED DECISIONS
            </motion.p>

            <h1 className="mt-8 font-serif">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.15] tracking-tight text-black">
                <SplitText delay={0.4}>인테리어에도</SplitText>
              </span>
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.15] tracking-tight text-black">
                <SplitText delay={0.7}>안목이 필요합니다.</SplitText>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1, ease }}
              className="mt-8 max-w-sm text-[14px] leading-[2] text-black/35"
            >
              121,515건의 시장 데이터가 만든 기준.
              <br />견적서를 읽는 눈을 드립니다.
            </motion.p>

            {/* Magnetic CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1, ease }}
              className="mt-12 flex items-center gap-8"
            >
              <MagneticButton strength={0.25}>
                <Link
                  href="/audit"
                  className="border-b border-black pb-1 text-[12px] font-medium tracking-[0.1em] text-black transition-all duration-500 hover:border-[#C9A96E] hover:text-[#C9A96E]"
                >
                  견적서 분석
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link
                  href="/intevity"
                  className="text-[12px] tracking-[0.1em] text-black/40 transition-colors duration-500 hover:text-black/70"
                >
                  성향분석
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1, ease }}
              className="mt-20 flex gap-10"
            >
              {[{ n: "121,515", l: "데이터" }, { n: "450", l: "사례" }, { n: "17", l: "공정" }].map(d => (
                <div key={d.n} className="flex items-baseline gap-1.5">
                  <span className="font-mono text-[10px] text-black/45">{d.n}</span>
                  <span className="text-[9px] text-black/25">{d.l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Room with parallax */}
          <motion.div
            className="lg:col-span-7"
            style={{ y: roomY, scale: roomScale }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.6, ease }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-black/[0.04] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)]">
              <RoomIllustration />
              {/* WebGL displacement overlay — mouse reactive */}
              <DisplacementCanvas />
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 rounded-full border-[0.5px] border-[#D4764B]/20 bg-[#D4764B]/[0.1] px-3 py-1.5 backdrop-blur-md">
                <svg width="10" height="10" viewBox="0 0 12 12"><polygon points="6,0 7.5,4 12,4.5 8.5,7.5 9.5,12 6,9.5 2.5,12 3.5,7.5 0,4.5 4.5,4" fill="#D4764B"/></svg>
                <span className="text-[9px] font-medium uppercase tracking-[1.5px] text-[#e8a87c]">interibot ai</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1, ease }}
        className="mx-auto mt-16 max-w-7xl px-6 pb-16"
      >
        <div className="h-[0.5px] bg-[#C9A96E]/15" />
      </motion.div>
    </section>
  );
}

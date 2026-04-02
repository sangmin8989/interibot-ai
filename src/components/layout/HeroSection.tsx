"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* Chanel: black & white. Gold whisper. Typography IS the hero. Nothing else. */

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white">
      {/* Subtle geometric line pattern — Chanel tweed texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 40px),
                            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 40px)`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease }}
            className="text-[10px] font-medium tracking-[0.5em] text-[#C9A96E]"
          >
            INTERIBOT AI
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease }}
            className="mt-10 font-serif"
          >
            <span className="block text-[clamp(2rem,5.5vw,4.5rem)] font-extralight leading-[1.15] tracking-tight text-black">
              인테리어에도
            </span>
            <span className="block text-[clamp(2rem,5.5vw,4.5rem)] font-black leading-[1.15] tracking-tight text-black">
              안목이 필요합니다.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 1, ease }}
            className="mx-auto mt-10 max-w-sm text-[14px] leading-[2] text-black/30"
          >
            121,515건의 시장 데이터가 만든 기준.
            <br />
            견적서를 읽는 눈을 드립니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1, ease }}
            className="mt-16 flex items-center justify-center gap-10"
          >
            <Link
              href="/audit"
              className="border-b border-black pb-1 text-[12px] font-medium tracking-[0.1em] text-black transition-all duration-500 hover:border-[#C9A96E] hover:text-[#C9A96E]"
            >
              견적서 분석
            </Link>
            <Link
              href="/intevity"
              className="text-[12px] tracking-[0.1em] text-black/40 transition-colors duration-500 hover:text-black/70"
            >
              성향분석
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom — thin gold line + data */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1, ease }}
          className="absolute bottom-12 left-6 right-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="h-[0.5px] bg-[#C9A96E]/20" />
            <div className="mt-4 flex gap-12">
              {[
                { n: "121,515", l: "데이터" },
                { n: "450", l: "사례" },
                { n: "17", l: "공정" },
              ].map((d) => (
                <div key={d.n} className="flex items-baseline gap-1.5">
                  <span className="font-mono text-[10px] text-black/45">{d.n}</span>
                  <span className="text-[9px] text-black/40">{d.l}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

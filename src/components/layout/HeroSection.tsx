"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DEMO_AUDIT_REPORT, formatWon, getStatusColor } from "@/lib/demo-data";
import { AnimatedBar } from "@/components/shared/motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAF9F7]">
      {/* Single warm accent — like Hermès orange on cream */}
      <div className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[40vw] bg-gradient-to-bl from-[#FF6B35]/[0.04] to-transparent" />

      <div className="mx-auto max-w-6xl px-6 pt-40 lg:pt-48">
        <div className="grid items-start gap-20 lg:grid-cols-12">
          {/* Typography — serif, massive, hand-set feel */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease }}
              className="text-[11px] tracking-[0.4em] text-[#1A1A1A]/30"
            >
              INTERIOR AUDIT BY AI
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease }}
              className="mt-8 font-serif"
            >
              <span className="block text-[clamp(2.5rem,6vw,4.5rem)] font-extralight leading-[1.1] tracking-tight text-[#1A1A1A]">
                같은 평수에
              </span>
              <span className="block text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-[#1A1A1A]">
                3천만원의 차이.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1, ease }}
              className="mt-10 max-w-md text-[15px] leading-[1.8] text-[#1A1A1A]/40"
            >
              121,515건의 시장 거래 데이터.
              <br />
              당신이 받은 견적서가 어디에 위치하는지,
              <br />
              숫자로 말씀드립니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1, ease }}
              className="mt-14 flex items-center gap-8"
            >
              <Link
                href="/audit"
                className="border-b border-[#1A1A1A] pb-1 text-[13px] font-medium tracking-wide text-[#1A1A1A] transition-all duration-500 hover:border-[#FF6B35] hover:text-[#FF6B35]"
              >
                견적서 분석하기
              </Link>
              <Link
                href="/intevity"
                className="text-[13px] tracking-wide text-[#1A1A1A]/30 transition-colors duration-500 hover:text-[#1A1A1A]/60"
              >
                성향분석
              </Link>
            </motion.div>
          </motion.div>

          {/* Report card — floating with luxury shadow */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.4, ease }}
          >
            <div className="overflow-hidden rounded-sm border border-[#1A1A1A]/[0.06] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
              {/* Header */}
              <div className="border-b border-[#1A1A1A]/[0.04] px-6 py-4">
                <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/30">AUDIT REPORT</p>
                <p className="mt-1 font-serif text-sm text-[#1A1A1A]">{DEMO_AUDIT_REPORT.apartment}</p>
              </div>

              {/* Process rows */}
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {DEMO_AUDIT_REPORT.processes.map((p, i) => {
                    const sc = getStatusColor(p.status);
                    return (
                      <motion.div
                        key={p.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.8, ease }}
                        className="space-y-1.5"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="text-[12px] text-[#1A1A1A]/70">{p.name}</span>
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono text-[11px] text-[#1A1A1A]/30">{formatWon(p.amount)}</span>
                            <span className={`text-[10px] font-medium ${
                              p.status === "PASS" ? "text-[#1A1A1A]/30" : p.status === "WARN" ? "text-[#C68A2E]" : "text-[#C44B3F]"
                            }`}>{p.status}</span>
                          </div>
                        </div>
                        <AnimatedBar percent={p.percentile} color={sc.bar} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#1A1A1A]/[0.04] px-6 py-3">
                <p className="text-[10px] text-[#1A1A1A]/20">{DEMO_AUDIT_REPORT.data_source}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom spacer with subtle data */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1, ease }}
          className="mt-32 border-t border-[#1A1A1A]/[0.04] pt-6 pb-20"
        >
          <div className="flex gap-16">
            <div>
              <span className="font-mono text-[11px] text-[#1A1A1A]/20">121,515</span>
              <span className="ml-2 text-[10px] text-[#1A1A1A]/10">데이터</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-[#1A1A1A]/20">450</span>
              <span className="ml-2 text-[10px] text-[#1A1A1A]/10">사례</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-[#1A1A1A]/20">17</span>
              <span className="ml-2 text-[10px] text-[#1A1A1A]/10">공정</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

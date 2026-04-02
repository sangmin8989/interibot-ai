"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DEMO_AUDIT_REPORT, formatWon, getStatusColor } from "@/lib/demo-data";
import { AnimatedBar } from "@/components/shared/motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0B]">
      {/* Giant background number — Picasso: typography as object */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="select-none text-[30vw] font-black leading-none text-white/[0.02]">
          32
        </span>
      </div>

      {/* Asymmetric orange accent shape */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-[#FF6B35]/[0.07] blur-[100px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[300px] w-[600px] rotate-12 bg-[#FF6B35]/[0.03] blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 lg:pt-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Left: Massive typography — Picasso: words as art */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease }}
            >
              {/* Tiny label with deliberate tension against huge text */}
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#FF6B35]/60">
                AI 견적 감사
              </p>

              {/* Headline: intentionally broken lines, mixed weights */}
              <h1 className="mt-6">
                <span className="block text-[clamp(2.5rem,7vw,5.5rem)] font-extralight leading-[0.95] tracking-tight text-white/90">
                  같은 평수인데
                </span>
                <span className="block text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.95] tracking-tighter text-white">
                  왜{" "}
                  <span className="text-[#FF6B35]">3천만원</span>
                </span>
                <span className="block text-[clamp(2.5rem,7vw,5.5rem)] font-extralight leading-[0.95] tracking-tight text-white/60">
                  차이 나는가.
                </span>
              </h1>

              {/* Subtext — deliberately minimal, offset */}
              <p className="mt-10 max-w-sm text-sm leading-relaxed text-white/30">
                121,515건의 시장 데이터.
                <br />
                당신의 견적서가 어디에 위치하는지 알려드립니다.
              </p>

              {/* CTAs — asymmetric sizing */}
              <div className="mt-12 flex items-center gap-4">
                <Link
                  href="/audit"
                  className="rounded-full bg-[#FF6B35] px-7 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(255,107,53,0.3)]"
                >
                  견적서 분석
                </Link>
                <Link
                  href="/intevity"
                  className="text-sm text-white/40 transition hover:text-white/70"
                >
                  성향분석 →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating report card — Picasso: fragmented perspective */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 60, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <div className="relative">
              {/* Shadow card behind — depth illusion */}
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl bg-[#FF6B35]/5" />

              {/* Main report */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111113]">
                <div className="border-b border-white/[0.04] px-5 py-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-white/60">감사 리포트</span>
                    <span className="font-mono text-[10px] text-[#FF6B35]">P{DEMO_AUDIT_REPORT.position_pct}</span>
                  </div>
                </div>
                <div className="divide-y divide-white/[0.03]">
                  {DEMO_AUDIT_REPORT.processes.map((p, i) => {
                    const sc = getStatusColor(p.status);
                    return (
                      <motion.div
                        key={p.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.08, ease }}
                        className="flex items-center gap-3 px-5 py-3"
                      >
                        <span className="w-12 shrink-0 text-[11px] font-medium text-white/50">{p.name.replace("공사", "")}</span>
                        <div className="flex-1">
                          <AnimatedBar percent={p.percentile} color={sc.bar} className="h-1.5" />
                        </div>
                        <span className="w-12 text-right font-mono text-[10px] text-white/30">{formatWon(p.amount)}</span>
                        <span className={`w-10 rounded px-1.5 py-0.5 text-center text-[9px] font-bold ${sc.bg} ${sc.text}`}>
                          {p.status}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="px-5 py-2.5">
                  <p className="text-[9px] text-white/20">{DEMO_AUDIT_REPORT.data_source}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: scattered data points — Picasso: objects in space */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-24 flex flex-wrap items-baseline gap-x-16 gap-y-4 pb-20 lg:mt-32"
        >
          <div>
            <span className="font-mono text-3xl font-black text-white/10">121,515</span>
            <span className="ml-2 text-[10px] text-white/20">시장 데이터</span>
          </div>
          <div>
            <span className="font-mono text-3xl font-black text-white/10">450</span>
            <span className="ml-2 text-[10px] text-white/20">시공 사례</span>
          </div>
          <div>
            <span className="font-mono text-3xl font-black text-white/10">17</span>
            <span className="ml-2 text-[10px] text-white/20">공정</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

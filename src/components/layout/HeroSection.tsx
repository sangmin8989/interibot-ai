"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { DEMO_AUDIT_REPORT, formatWon, getStatusColor } from "@/lib/demo-data";
import { AnimatedBar } from "@/components/shared/motion";

const ease = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0B]">
      {/* Mesh glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-[#FF6B35]/10 blur-[120px]" />
        <div className="absolute -left-20 top-1/3 h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
      </div>
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 lg:flex-row lg:items-start lg:gap-16 lg:pt-40">
        {/* Left: Copy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-left"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF6B35]/30 bg-[#FF6B35]/10 px-4 py-1.5 text-sm font-medium text-[#FF6B35]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B35]" />
              국내 유일 AI 견적 감사 서비스
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-8 text-[2.75rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            같은 32평인데
            <br />
            왜{" "}
            <span className="bg-gradient-to-r from-[#FF6B35] to-amber-400 bg-clip-text text-transparent">
              3,000만원
            </span>
            이나
            <br />
            차이 날까?
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-gray-400 lg:mx-0">
            121,515건 시장 데이터 기반 AI가
            <br className="hidden sm:block" />
            견적서를 분석합니다.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/audit"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#FF6B35] px-7 py-3.5 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#FF6B35]/25"
            >
              <span className="relative z-10">견적서 분석하기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-amber-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            <Link
              href="/intevity"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-7 py-3.5 text-base font-medium text-gray-300 transition-all hover:border-[#FF6B35]/40 hover:text-white"
            >
              성향분석 시작
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Live demo report */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="mt-16 w-full max-w-xl flex-1 lg:mt-0"
          style={{ perspective: 1200 }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141416] shadow-2xl shadow-black/40">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#1A1A1C] px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="ml-3 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs text-gray-500">
                interibot-ai.vercel.app/audit
              </div>
            </div>
            {/* Report content */}
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">감사 리포트</p>
                  <p className="text-xs text-gray-500">{DEMO_AUDIT_REPORT.apartment} · {DEMO_AUDIT_REPORT.data_source}</p>
                </div>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
                  상위 {DEMO_AUDIT_REPORT.position_pct}%
                </span>
              </div>
              <div className="space-y-2.5">
                {DEMO_AUDIT_REPORT.processes.map((p) => {
                  const sc = getStatusColor(p.status);
                  return (
                    <div key={p.name} className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2.5">
                      <span className="w-16 shrink-0 text-xs font-medium text-gray-300">{p.name}</span>
                      <div className="flex-1">
                        <AnimatedBar percent={p.percentile} color={sc.bar} />
                      </div>
                      <span className="w-10 text-right font-mono text-xs text-gray-400">P{p.percentile}</span>
                      <span className="w-14 text-right text-xs text-gray-500">{formatWon(p.amount)}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                        {p.status}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Warnings */}
              <div className="mt-3 space-y-1.5">
                {DEMO_AUDIT_REPORT.warnings.map((w) => (
                  <p key={w} className="text-[11px] text-amber-400/70">⚠ {w}</p>
                ))}
              </div>
              <p className="mt-3 text-right text-[10px] text-gray-600">{DEMO_AUDIT_REPORT.data_source}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-5 w-5 animate-bounce text-gray-600" />
      </div>
    </section>
  );
}

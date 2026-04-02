"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 pt-16">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-orange-500/20 via-amber-500/10 to-transparent blur-3xl" />
      </div>
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm text-orange-400">
            🔥 국내 유일 AI 견적 감사 서비스
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl"
        >
          같은 32평인데
          <br />
          <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            왜 3,000만원이나 차이 날까?
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 md:text-xl"
        >
          12만건 시장 데이터와 실제 시공 사례로 검증하는 AI.
          <br className="hidden sm:block" />
          견적서를 올리면 적정가인지 바로 알려드립니다.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/audit"
            className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:scale-105"
          >
            무료로 견적서 분석하기
          </Link>
          <Link
            href="/intevity"
            className="rounded-xl border border-gray-700 px-8 py-4 text-lg font-medium text-gray-300 transition hover:border-orange-500 hover:text-orange-400"
          >
            성향분석 먼저 해보기
          </Link>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          variants={item}
          className="mt-16 w-full max-w-3xl"
          style={{ perspective: 1000 }}
        >
          <div
            className="rounded-xl border border-gray-800 bg-gray-900 p-1 shadow-2xl"
            style={{ transform: "rotateX(5deg)" }}
          >
            {/* Browser bar */}
            <div className="flex items-center gap-2 rounded-t-lg bg-gray-800 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              <div className="ml-4 flex-1 rounded-md bg-gray-700 px-3 py-1 text-xs text-gray-400">
                interibot-ai.vercel.app/audit
              </div>
            </div>
            {/* Mockup content */}
            <div className="space-y-2 rounded-b-lg bg-white p-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-gray-800">감사 리포트</span>
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-800">
                  WARN
                </span>
              </div>
              {[
                { name: "목공사", amount: "820만", pct: 48, verdict: "PASS", color: "green" },
                { name: "타일공사", amount: "650만", pct: 78, verdict: "WARN", color: "yellow" },
                { name: "전기공사", amount: "380만", pct: 92, verdict: "BLOCK", color: "red" },
              ].map((r) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                >
                  <span className="text-sm font-medium text-gray-700">{r.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="hidden w-24 sm:block">
                      <div className="h-1.5 rounded-full bg-gray-200">
                        <div
                          className={`h-1.5 rounded-full ${
                            r.color === "green"
                              ? "bg-green-500"
                              : r.color === "yellow"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{r.amount}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        r.color === "green"
                          ? "bg-green-100 text-green-800"
                          : r.color === "yellow"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {r.verdict}
                    </span>
                  </div>
                </div>
              ))}
              <p className="pt-1 text-right text-[10px] text-gray-400">
                출처: 시장 450건 기준
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-6 w-6 animate-bounce text-gray-600" />
      </div>
    </section>
  );
}

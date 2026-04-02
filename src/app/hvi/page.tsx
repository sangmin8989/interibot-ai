"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/shared/motion";
import { DEMO_HVI, formatWon } from "@/lib/demo-data";
import HviResultCard from "@/components/hvi/HviResult";
import ValueChart from "@/components/hvi/ValueChart";
import ProcessRoi from "@/components/hvi/ProcessRoi";
import type { HviResult } from "@/types";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

const ALL_PROCESSES = [
  "철거공사", "목공사", "전기공사", "설비공사", "타일공사", "도장공사", "도배공사",
  "바닥공사", "필름공사", "창호공사", "도어공사", "도기공사", "수전공사", "가구공사",
  "확장공사", "조명공사", "기타공사",
];

const DEFAULT_AMOUNTS: Record<string, string> = {
  "목공사": "820", "타일공사": "650", "전기공사": "380", "설비공사": "320",
  "도배공사": "280", "도장공사": "250", "바닥공사": "450", "철거공사": "200",
};

export default function HviPage() {
  const [result, setResult] = useState<HviResult | null>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [areaPy, setAreaPy] = useState("32");
  const [amounts, setAmounts] = useState<Record<string, string>>(DEFAULT_AMOUNTS);
  const formRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = ALL_PROCESSES
        .filter((p) => amounts[p] && Number(amounts[p]) > 0)
        .map((p) => ({ processName: p, amount: Number(amounts[p]) * 10000 }));
      const total = items.reduce((s, i) => s + i.amount, 0);
      const res = await fetch("/api/hvi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote: { items, totalAmount: total }, areaPy: Number(areaPy) }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setResult((await res.json()).result);
      setTotalCost(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl space-y-8 px-4 py-12">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] md:text-4xl">집값 분석 결과</h1>
            <p className="mt-2 text-[#6B7280]">리모델링 투자 대비 예상 집값 상승 분석</p>
          </div>
          <HviResultCard result={result} />
          <ValueChart totalCost={totalCost} hvi={result.hvi} />
          <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#1A1A1A]">공정별 ROI</h3>
            <div className="mt-4"><ProcessRoi data={result.processRoi} /></div>
          </div>
          <div className="rounded-2xl bg-[#FF6B35]/5 p-6">
            <p className="text-sm font-semibold text-[#1A1A1A]">우선 투자 공정 추천</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.processRoi.slice(0, 3).map((p) => (
                <span key={p.processName} className="rounded-full bg-[#FF6B35] px-4 py-1.5 text-sm font-semibold text-white">
                  {p.processName} (ROI {p.roi}%)
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <button onClick={() => setResult(null)} className="rounded-xl border border-black/[0.06] px-6 py-3 text-sm font-semibold text-[#6B7280] transition hover:border-black/10">다시 분석하기</button>
            <Link href="/chat" className="rounded-xl bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E85D2C]">AI에게 질문하기</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero + Demo */}
      <section className="bg-[#FAFAF9] px-4 pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="text-center">
            <h1 className="text-3xl font-bold text-[#1A1A1A] md:text-5xl">
              리모델링, <span className="text-[#FF6B35]">얼마나 남을까?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[#6B7280]">공사 비용 대비 집값 상승 효과를 분석합니다</p>
          </FadeIn>

          <FadeIn delay={0.2} className="mx-auto mt-12 max-w-md">
            <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-xl">
              <p className="text-sm font-bold text-[#1A1A1A]">🏠 집값 분석 — 서울 32평</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#FF6B35]/5 p-3 text-center">
                  <p className="text-[10px] text-[#9CA3AF]">HVI</p>
                  <p className="text-lg font-bold text-[#FF6B35]">+{formatWon(DEMO_HVI.hvi)}</p>
                </div>
                <div className="rounded-xl bg-[#FAFAF9] p-3 text-center">
                  <p className="text-[10px] text-[#9CA3AF]">ROI</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">{DEMO_HVI.roi}%</p>
                </div>
                <div className="rounded-xl bg-[#FAFAF9] p-3 text-center">
                  <p className="text-[10px] text-[#9CA3AF]">LII</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">{DEMO_HVI.lii}등급</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {DEMO_HVI.processRoi.slice(0, 4).map((p) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="w-14 text-xs font-medium text-[#6B7280]">{p.name}</span>
                    <div className="h-2 flex-1 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-400" style={{ width: `${p.roi}%` }} />
                    </div>
                    <span className="w-10 text-right font-mono text-xs text-[#6B7280]">{p.roi}%</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-8 text-center">
            <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B35]">
              내 견적도 분석해보기 <ArrowDown className="h-4 w-4" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Input form with 17 processes */}
      <section ref={formRef} className="px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">공정별 금액 입력</h2>
          <p className="mt-2 text-[#6B7280]">17개 표준 공정 기준으로 분석합니다. 해당하는 항목만 입력하세요.</p>

          <div className="mt-8 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-lg">
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-semibold text-[#1A1A1A]">평수</label>
              <div className="flex gap-2">
                {["25", "32", "40", "45"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAreaPy(v)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      areaPy === v
                        ? "bg-[#FF6B35] text-white"
                        : "bg-[#FAFAF9] text-[#6B7280] hover:bg-gray-100"
                    }`}
                  >
                    {v}평
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="직접입력"
                  value={!["25", "32", "40", "45"].includes(areaPy) ? areaPy : ""}
                  onChange={(e) => setAreaPy(e.target.value)}
                  className="w-24 rounded-lg border border-black/[0.06] px-3 py-2 text-sm"
                />
              </div>
            </div>

            <label className="mb-3 block text-sm font-semibold text-[#1A1A1A]">공정별 금액 (만원)</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {ALL_PROCESSES.map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <span className="w-16 shrink-0 text-xs font-medium text-[#6B7280]">{p.replace("공사", "")}</span>
                  <input
                    type="number"
                    value={amounts[p] || ""}
                    onChange={(e) => setAmounts({ ...amounts, [p]: e.target.value })}
                    placeholder="0"
                    className="w-full rounded-lg border border-black/[0.06] px-3 py-2 text-sm transition focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/10"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="mt-8 w-full rounded-xl bg-[#FF6B35] py-4 text-base font-semibold text-white transition hover:bg-[#E85D2C] disabled:opacity-50"
            >
              {isLoading ? "분석 중..." : "집값 분석 시작"}
            </button>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

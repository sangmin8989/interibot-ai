"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HviResultCard from "@/components/hvi/HviResult";
import ValueChart from "@/components/hvi/ValueChart";
import ProcessRoi from "@/components/hvi/ProcessRoi";
import type { HviResult } from "@/types";
import Link from "next/link";

const defaultProcesses = [
  { name: "목공사", amount: "820" },
  { name: "타일공사", amount: "650" },
  { name: "전기공사", amount: "380" },
  { name: "설비공사", amount: "320" },
  { name: "도배공사", amount: "280" },
  { name: "도장공사", amount: "250" },
  { name: "바닥공사", amount: "450" },
];

export default function HviPage() {
  const [result, setResult] = useState<HviResult | null>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [areaPy, setAreaPy] = useState("32");
  const [processes, setProcesses] = useState(defaultProcesses);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const quote = {
        items: processes.filter((p) => p.amount).map((p) => ({
          processName: p.name,
          amount: Number(p.amount) * 10000,
        })),
        totalAmount: processes.reduce((sum, p) => sum + (Number(p.amount) || 0) * 10000, 0),
      };
      const res = await fetch("/api/hvi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote, areaPy: Number(areaPy) }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
      const data = await res.json();
      setResult(data.result);
      setTotalCost(quote.totalAmount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl space-y-8 px-4 py-12"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">집값 분석 결과</h1>
            <p className="mt-2 text-gray-500">리모델링 투자 대비 예상 집값 상승 분석</p>
          </div>
          <HviResultCard result={result} />
          <ValueChart totalCost={totalCost} hvi={result.hvi} />
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900">공정별 ROI</h3>
            <p className="mt-1 text-sm text-gray-500">어떤 공정이 집값에 가장 효과적인지</p>
            <div className="mt-4">
              <ProcessRoi data={result.processRoi} />
            </div>
          </div>

          <div className="rounded-2xl bg-orange-50 p-6">
            <p className="text-sm font-semibold text-gray-800">우선 투자 공정 추천</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.processRoi.slice(0, 3).map((p) => (
                <span key={p.processName} className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-1.5 text-sm font-semibold text-white">
                  {p.processName} (ROI {p.roi}%)
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button onClick={() => setResult(null)} className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300">
              다시 분석하기
            </button>
            <Link href="/chat" className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105">
              AI에게 질문하기
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">집값 분석</h1>
        <p className="mt-3 text-gray-500">견적 정보를 입력하면 리모델링 후 예상 집값 상승을 분석합니다.</p>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-800">평수</label>
            <input
              type="number"
              value={areaPy}
              onChange={(e) => setAreaPy(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
            />
          </div>
          <div className="mt-6">
            <label className="mb-3 block text-sm font-semibold text-gray-800">공정별 금액 (만원)</label>
            <div className="space-y-2">
              {processes.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="w-20 text-sm font-medium text-gray-600">{p.name}</span>
                  <input
                    type="number"
                    value={p.amount}
                    onChange={(e) => {
                      const updated = [...processes];
                      updated[i] = { ...p, amount: e.target.value };
                      setProcesses(updated);
                    }}
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm transition focus:border-orange-400 focus:outline-none"
                    placeholder="만원"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:scale-[1.02] disabled:opacity-50"
          >
            {isLoading ? "분석 중..." : "집값 분석 시작"}
          </button>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

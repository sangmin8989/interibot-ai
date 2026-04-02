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

const ease = [0.16, 1, 0.3, 1] as const;
const ALL_PROCESSES = [
  "철거공사","목공사","전기공사","설비공사","타일공사","도장공사","도배공사",
  "바닥공사","필름공사","창호공사","도어공사","도기공사","수전공사","가구공사",
  "확장공사","조명공사","기타공사",
];
const DEFAULTS: Record<string,string> = { "목공사":"820","타일공사":"650","전기공사":"380","설비공사":"320","도배공사":"280","도장공사":"250","바닥공사":"450","철거공사":"200" };

export default function HviPage() {
  const [result, setResult] = useState<HviResult | null>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [areaPy, setAreaPy] = useState("32");
  const [amounts, setAmounts] = useState<Record<string,string>>(DEFAULTS);
  const formRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    setIsLoading(true); setError(null);
    try {
      const items = ALL_PROCESSES.filter(p => amounts[p] && Number(amounts[p]) > 0).map(p => ({ processName: p, amount: Number(amounts[p]) * 10000 }));
      const total = items.reduce((s,i) => s + i.amount, 0);
      const res = await fetch("/api/hvi", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quote: { items, totalAmount: total }, areaPy: Number(areaPy) }) });
      if (!res.ok) throw new Error((await res.json()).error);
      setResult((await res.json()).result);
      setTotalCost(total);
    } catch (e) { setError(e instanceof Error ? e.message : "오류"); } finally { setIsLoading(false); }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }} className="mx-auto max-w-3xl space-y-10 px-6 py-16">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/50">RESULT</p>
            <h1 className="mt-4 font-serif text-2xl font-light text-[#1A1A1A]">집값 분석 결과</h1>
          </div>
          <HviResultCard result={result} />
          <ValueChart totalCost={totalCost} hvi={result.hvi} />
          <div className="rounded-sm border border-[#1A1A1A]/[0.06] bg-white p-8">
            <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/50">PROCESS ROI</p>
            <div className="mt-4"><ProcessRoi data={result.processRoi} /></div>
          </div>
          <div className="flex justify-center gap-8 pt-6">
            <button onClick={() => setResult(null)} className="text-[12px] text-[#1A1A1A]/50 transition hover:text-[#1A1A1A]/50">다시 분석</button>
            <Link href="/chat" className="border-b border-[#1A1A1A] pb-0.5 text-[12px] text-[#1A1A1A] transition hover:border-[#C9A96E] hover:text-[#C9A96E]">상담하기</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="px-6 pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/50">HOME VALUE</p>
            <h1 className="mt-6 max-w-md font-serif text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.3] text-[#1A1A1A]">
              공사 후의 가치를<br />미리 봅니다.
            </h1>
            <p className="mt-6 max-w-md text-[14px] leading-[1.9] text-[#1A1A1A]/35">
              어떤 공정이 집의 가치에 기여하는지. 데이터로 보여드립니다.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-10">
            <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} className="border-b border-[#1A1A1A]/15 pb-0.5 text-[12px] text-[#1A1A1A]/30 transition hover:border-[#1A1A1A] hover:text-[#1A1A1A]">
              분석하기 ↓
            </button>
          </FadeIn>
        </div>
      </section>

      <section ref={formRef} className="border-t border-[#1A1A1A]/[0.04] bg-white px-6 py-20">
        <div className="mx-auto max-w-lg">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/50">평수</p>
              <div className="mt-3 flex gap-3">
                {["25","32","40","45"].map(v => (
                  <button key={v} onClick={() => setAreaPy(v)} className={`pb-1 text-[13px] transition-all duration-500 ${areaPy === v ? "border-b border-[#1A1A1A] text-[#1A1A1A]" : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]/40"}`}>{v}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/50">공정별 금액 <span className="text-[#1A1A1A]/40">(만원)</span></p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {ALL_PROCESSES.map(p => (
                  <div key={p} className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-[11px] text-[#1A1A1A]/30">{p.replace("공사","")}</span>
                    <input
                      type="number"
                      value={amounts[p] || ""}
                      onChange={e => setAmounts({ ...amounts, [p]: e.target.value })}
                      placeholder="—"
                      className="w-full border-b border-[#1A1A1A]/[0.06] bg-transparent pb-1 text-[13px] text-[#1A1A1A] outline-none transition focus:border-[#1A1A1A]/20"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full border-b border-[#1A1A1A] pb-1 text-center text-[13px] font-medium text-[#1A1A1A] transition-all duration-500 hover:border-[#C9A96E] hover:text-[#C9A96E] disabled:border-[#1A1A1A]/10 disabled:text-[#1A1A1A]/45"
            >
              {isLoading ? "분석 중..." : "분석하기"}
            </button>
            {error && <p className="text-[12px] text-[#C44B3F]">{error}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

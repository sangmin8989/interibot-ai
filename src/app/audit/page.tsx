"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "@/components/audit/FileUpload";
import AuditReportView from "@/components/audit/AuditReport";
import { FadeIn, AnimatedBar } from "@/components/shared/motion";
import { DEMO_AUDIT_REPORT, formatWon, getStatusColor } from "@/lib/demo-data";
import type { AuditReport } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;
const STEPS = ["수신", "추출", "비교", "탐지", "생성"];

export default function AuditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) return;
    setStep(0);
    const t = STEPS.map((_, i) => setTimeout(() => setStep(i), i * 1500));
    return () => t.forEach(clearTimeout);
  }, [isLoading]);

  const handleUpload = async (data: { estimateFile: File; floorplanFile?: File; apartmentName?: string; areaPy?: number; region?: string }) => {
    setIsLoading(true); setError(null);
    try {
      const fd = new FormData();
      fd.append("estimate", data.estimateFile);
      if (data.floorplanFile) fd.append("floorplan", data.floorplanFile);
      if (data.apartmentName) fd.append("apartmentName", data.apartmentName);
      if (data.areaPy) fd.append("areaPy", String(data.areaPy));
      if (data.region) fd.append("region", data.region);
      const r1 = await fetch("/api/upload", { method: "POST", body: fd });
      if (!r1.ok) throw new Error((await r1.json()).error);
      const d1 = await r1.json();
      const r2 = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quote: d1.quote, areaPy: d1.areaPy || 32 }) });
      if (!r2.ok) throw new Error((await r2.json()).error);
      setReport((await r2.json()).report);
    } catch (e) { setError(e instanceof Error ? e.message : "오류"); } finally { setIsLoading(false); }
  };

  if (report) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease }} className="mx-auto max-w-3xl px-6 py-12">
          <AuditReportView report={report} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="px-6 pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-[10px] tracking-[0.4em] text-[#1A1A1A]/50">AUDIT</p>
            <h1 className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.4] text-[#1A1A1A]">
              받으신 견적서,<br />기준 위에 올려보겠습니다.
            </h1>
            <p className="mt-6 text-[14px] leading-[1.9] text-[#1A1A1A]/35">
              각 공정이 시장의 어디에 위치하는지, 빠진 항목은 없는지. 데이터가 보여드립니다.
            </p>
          </FadeIn>

          {/* Demo */}
          <FadeIn delay={0.2} className="mt-12 text-left">
            <div className="overflow-hidden rounded-sm border border-[#1A1A1A]/[0.06] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]">
              <div className="border-b border-[#1A1A1A]/[0.04] px-6 py-4">
                <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/45">SAMPLE</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                {DEMO_AUDIT_REPORT.processes.map((p) => {
                  const sc = getStatusColor(p.status);
                  return (
                    <div key={p.name} className="space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[12px] text-[#1A1A1A]/40">{p.name}</span>
                        <span className={`text-[10px] ${p.status === "PASS" ? "text-[#1A1A1A]/45" : p.status === "WARN" ? "text-[#C68A2E]" : "text-[#C44B3F]"}`}>{p.status}</span>
                      </div>
                      <AnimatedBar percent={p.percentile} color={sc.bar} />
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-10 text-center">
            <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} className="border-b border-[#1A1A1A]/15 pb-0.5 text-[12px] text-[#1A1A1A]/40 transition hover:border-[#1A1A1A] hover:text-[#1A1A1A]">
              견적서 올리기 ↓
            </button>
          </FadeIn>
        </div>
      </section>

      <section ref={formRef} className="border-t border-[#1A1A1A]/[0.04] bg-white px-6 py-20">
        <div className="mx-auto max-w-lg">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 text-center">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border border-[#1A1A1A]/10 border-t-[#1A1A1A]/40" />
                <div className="mt-10 flex justify-center gap-4">
                  {STEPS.map((s, i) => (
                    <span key={s} className={`font-mono text-[10px] transition-all duration-700 ${i <= step ? "text-[#1A1A1A]/40" : "text-[#1A1A1A]/40"}`}>{s}</span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FileUpload onUploadComplete={handleUpload} isLoading={isLoading} />
                {error && <p className="mt-4 text-[12px] text-[#C44B3F]">{error}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

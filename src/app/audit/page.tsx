"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "@/components/audit/FileUpload";
import AuditReportView from "@/components/audit/AuditReport";
import { FadeIn, AnimatedBar } from "@/components/shared/motion";
import { DEMO_AUDIT_REPORT, formatWon, getStatusColor } from "@/lib/demo-data";
import type { AuditReport } from "@/types";
import { CheckCircle, Loader2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
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
    const timers = STEPS.map((_, i) => setTimeout(() => setStep(i), i * 1500));
    return () => timers.forEach(clearTimeout);
  }, [isLoading]);

  const handleUpload = async (data: {
    estimateFile: File; floorplanFile?: File; apartmentName?: string; areaPy?: number; region?: string;
  }) => {
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
      <div className="min-h-screen bg-[#FAFAF9] pt-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-4xl px-6 py-12">
          <AuditReportView report={report} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero — value first */}
      <section className="relative overflow-hidden bg-[#FAFAF9] px-6 pt-28 pb-24">
        <div className="pointer-events-none absolute -right-20 top-0 select-none text-[30vw] font-black leading-none text-neutral-100/50">
          P
        </div>
        <div className="relative z-10 mx-auto max-w-5xl">
          <FadeIn>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#FF6B35]/60">Audit</p>
            <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] tracking-tight text-neutral-900">
              견적서를 올리면
              <br /><span className="text-neutral-300">이걸 알 수 있습니다.</span>
            </h1>
          </FadeIn>

          {/* Live demo report */}
          <FadeIn delay={0.2} className="mt-12 max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg">
              <div className="border-b border-neutral-50 px-5 py-3">
                <span className="text-xs font-medium text-neutral-400">감사 리포트 — {DEMO_AUDIT_REPORT.apartment}</span>
              </div>
              <div className="divide-y divide-neutral-50">
                {DEMO_AUDIT_REPORT.processes.map((p) => {
                  const sc = getStatusColor(p.status);
                  return (
                    <div key={p.name} className="flex items-center gap-3 px-5 py-3">
                      <span className="w-12 text-[11px] font-medium text-neutral-500">{p.name.replace("공사","")}</span>
                      <div className="flex-1"><AnimatedBar percent={p.percentile} color={sc.bar} className="h-1.5" /></div>
                      <span className="font-mono text-[10px] text-neutral-300">P{p.percentile}</span>
                      <span className="font-mono text-[10px] text-neutral-400">{formatWon(p.amount)}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${sc.bg} ${sc.text}`}>{p.status}</span>
                    </div>
                  );
                })}
              </div>
              <div className="px-5 py-2.5 text-[9px] text-amber-500">
                {DEMO_AUDIT_REPORT.warnings.map((w) => <p key={w}>⚠ {w}</p>)}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="mt-8">
            <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} className="text-sm font-medium text-[#FF6B35]">
              내 견적서 분석하기 ↓
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Upload */}
      <section ref={formRef} className="px-6 py-20">
        <div className="mx-auto max-w-xl">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#FF6B35] border-t-transparent" />
                <div className="mt-8 flex gap-3">
                  {STEPS.map((s, i) => (
                    <div key={s} className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                      i < step ? "bg-emerald-500 text-white" : i === step ? "bg-[#FF6B35] text-white animate-pulse" : "bg-neutral-100 text-neutral-300"
                    }`}>
                      {i < step ? <CheckCircle className="h-3.5 w-3.5" /> : i === step ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : i + 1}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <FileUpload onUploadComplete={handleUpload} isLoading={isLoading} />
                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

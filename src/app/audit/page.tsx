"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "@/components/audit/FileUpload";
import AuditReportView from "@/components/audit/AuditReport";
import { FadeIn, AnimatedBar } from "@/components/shared/motion";
import { DEMO_AUDIT_REPORT, formatWon, getStatusColor } from "@/lib/demo-data";
import type { AuditReport } from "@/types";
import { CheckCircle, Loader2, ArrowDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
const STEPS = ["견적서 수신 완료", "AI가 항목을 추출하고 있습니다", "시장 데이터와 비교 중", "누락 공정 탐지 중", "리포트 생성 중"];

export default function AuditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const uploadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) return;
    setStep(0);
    const timers = STEPS.map((_, i) => setTimeout(() => setStep(i), i * 1500));
    return () => timers.forEach(clearTimeout);
  }, [isLoading]);

  const handleUpload = async (data: {
    estimateFile: File;
    floorplanFile?: File;
    apartmentName?: string;
    areaPy?: number;
    region?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("estimate", data.estimateFile);
      if (data.floorplanFile) formData.append("floorplan", data.floorplanFile);
      if (data.apartmentName) formData.append("apartmentName", data.apartmentName);
      if (data.areaPy) formData.append("areaPy", String(data.areaPy));
      if (data.region) formData.append("region", data.region);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      if (!uploadRes.ok) throw new Error((await uploadRes.json()).error || "업로드 실패");
      const uploadData = await uploadRes.json();

      const auditRes = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote: uploadData.quote, areaPy: uploadData.areaPy || 32 }),
      });
      if (!auditRes.ok) throw new Error((await auditRes.json()).error || "분석 실패");
      setReport((await auditRes.json()).report);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (report) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl px-4 py-12">
          <AuditReportView report={report} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero + Demo */}
      <section className="bg-[#FAFAF9] px-4 pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="text-center">
            <h1 className="text-3xl font-bold text-[#1A1A1A] md:text-5xl">
              견적서, <span className="text-[#FF6B35]">AI가 검증</span>합니다
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[#6B7280]">
              받은 견적서를 업로드하면 121,515건 시장 데이터 기준으로 공정별 적정가를 분석합니다
            </p>
          </FadeIn>

          {/* Demo report card */}
          <FadeIn delay={0.2} className="mx-auto mt-12 max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-xl" style={{ transform: "perspective(1200px) rotateX(2deg)" }}>
              <div className="flex items-center justify-between border-b border-black/[0.04] px-5 py-3">
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">📊 감사 리포트 — {DEMO_AUDIT_REPORT.apartment}</p>
                  <p className="text-xs text-[#9CA3AF]">{DEMO_AUDIT_REPORT.data_source}</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                  상위 {DEMO_AUDIT_REPORT.position_pct}%
                </span>
              </div>
              <div className="space-y-2 p-5">
                {DEMO_AUDIT_REPORT.processes.map((p) => {
                  const sc = getStatusColor(p.status);
                  return (
                    <div key={p.name} className="flex items-center gap-3 rounded-xl bg-[#FAFAF9] px-3 py-2.5">
                      <span className="w-16 shrink-0 text-xs font-medium text-[#1A1A1A]">{p.name}</span>
                      <div className="flex-1">
                        <AnimatedBar percent={p.percentile} color={sc.bar} />
                      </div>
                      <span className="w-10 text-right font-mono text-xs text-[#9CA3AF]">P{p.percentile}</span>
                      <span className="w-14 text-right text-xs text-[#6B7280]">{formatWon(p.amount)}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sc.bg} ${sc.text}`}>{p.status}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-black/[0.04] px-5 py-3">
                {DEMO_AUDIT_REPORT.warnings.map((w) => (
                  <p key={w} className="text-xs text-amber-600">⚠ {w}</p>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-8 text-center">
            <button
              onClick={() => uploadRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B35] transition hover:gap-3"
            >
              내 견적서도 분석해보기 <ArrowDown className="h-4 w-4" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Upload section */}
      <section ref={uploadRef} className="px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-16">
                <div className="h-10 w-10 animate-spin rounded-full border-3 border-[#FF6B35] border-t-transparent" />
                <p className="mt-6 text-lg font-semibold text-[#1A1A1A]">AI가 견적서를 분석하고 있습니다</p>
                <div className="mt-8 w-full max-w-xs space-y-3">
                  {STEPS.map((s, i) => (
                    <motion.div key={s} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="flex items-center gap-3">
                      {i < step ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : i === step ? <Loader2 className="h-5 w-5 animate-spin text-[#FF6B35]" /> : <div className="h-5 w-5 rounded-full border-2 border-gray-200" />}
                      <span className={`text-sm ${i <= step ? "font-medium text-[#1A1A1A]" : "text-[#9CA3AF]"}`}>{s}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold text-[#1A1A1A]">견적서 업로드</h2>
                <p className="mt-2 text-[#6B7280]">견적서를 올려주시면 AI가 분석합니다.</p>
                <div className="mt-8">
                  <FileUpload onUploadComplete={handleUpload} isLoading={isLoading} />
                </div>
                {error && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

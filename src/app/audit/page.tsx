"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileUpload from "@/components/audit/FileUpload";
import AuditReportView from "@/components/audit/AuditReport";
import type { AuditReport } from "@/types";
import { CheckCircle, Loader2 } from "lucide-react";

const STEPS = [
  "파일 읽는 중",
  "항목 추출 중",
  "시장 비교 중",
  "리스크 판정 중",
  "리포트 생성 중",
];

function AnalysisStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="mx-auto mt-12 max-w-sm space-y-3">
      {STEPS.map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="flex items-center gap-3"
        >
          {i < currentStep ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : i === currentStep ? (
            <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-gray-200" />
          )}
          <span
            className={`text-sm ${
              i <= currentStep ? "font-medium text-gray-800" : "text-gray-400"
            }`}
          >
            {step}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function AuditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    setStep(0);
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setStep(i), i * 1500)
    );
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
      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "파일 업로드 실패");
      }
      const uploadData = await uploadRes.json();

      const auditRes = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote: uploadData.quote, areaPy: uploadData.areaPy || 32 }),
      });
      if (!auditRes.ok) {
        const err = await auditRes.json();
        throw new Error(err.error || "감사 분석 실패");
      }
      const auditData = await auditRes.json();
      setReport(auditData.report);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <AnimatePresence mode="wait">
          {report ? (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AuditReportView report={report} />
            </motion.div>
          ) : isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-20"
            >
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-400 border-t-transparent" />
              <p className="mt-6 text-lg font-semibold text-gray-800">
                AI가 견적서를 분석하고 있습니다
              </p>
              <AnalysisStepper currentStep={step} />
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  견적서 감사
                </h1>
                <p className="mt-3 text-gray-500">
                  받은 견적서를 업로드하면 시장 데이터 기준으로 17개 공정을 분석합니다.
                </p>
              </div>
              <FileUpload onUploadComplete={handleUpload} isLoading={isLoading} />
              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import FileUpload from "@/components/audit/FileUpload";
import AuditReportView from "@/components/audit/AuditReport";
import type { AuditReport } from "@/types";

export default function AuditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      // 1. 파일 업로드 + OCR 추출
      const formData = new FormData();
      formData.append("estimate", data.estimateFile);
      if (data.floorplanFile) formData.append("floorplan", data.floorplanFile);
      if (data.apartmentName) formData.append("apartmentName", data.apartmentName);
      if (data.areaPy) formData.append("areaPy", String(data.areaPy));
      if (data.region) formData.append("region", data.region);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "파일 업로드 실패");
      }

      const uploadData = await uploadRes.json();

      // 2. 감사 분석
      const auditRes = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: uploadData.quote,
          areaPy: uploadData.areaPy || 32,
        }),
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
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">견적서 감사</h1>
        <p className="mt-2 text-muted-foreground">
          받은 견적서를 업로드하면 시장 데이터 기준으로 분석합니다.
        </p>
      </div>

      {report ? (
        <AuditReportView report={report} />
      ) : (
        <>
          <FileUpload onUploadComplete={handleUpload} isLoading={isLoading} />
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          {isLoading && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange border-t-transparent" />
              <p className="text-sm text-muted-foreground">
                AI가 견적서를 분석하고 있습니다...
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

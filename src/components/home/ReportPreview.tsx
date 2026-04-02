"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";

const mockItems = [
  { process: "철거공사", my: 280, p25: 250, p50: 310, p75: 380, pct: 38, verdict: "PASS" as const },
  { process: "목공사", my: 820, p25: 650, p50: 790, p75: 950, pct: 55, verdict: "PASS" as const },
  { process: "타일공사", my: 650, p25: 380, p50: 480, p75: 620, pct: 82, verdict: "WARN" as const },
  { process: "전기공사", my: 380, p25: 180, p50: 210, p75: 280, pct: 93, verdict: "BLOCK" as const },
  { process: "설비공사", my: 320, p25: 250, p50: 300, p75: 380, pct: 58, verdict: "PASS" as const },
  { process: "도배공사", my: 280, p25: 200, p50: 260, p75: 340, pct: 55, verdict: "PASS" as const },
];

const verdictStyle = {
  PASS: "bg-green-100 text-green-800",
  WARN: "bg-yellow-100 text-yellow-800",
  BLOCK: "bg-red-100 text-red-800",
};

const barColor = {
  PASS: "bg-green-500",
  WARN: "bg-yellow-500",
  BLOCK: "bg-red-500",
};

export default function ReportPreview() {
  return (
    <section className="bg-white px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            견적서 올리면 이런 분석을 받습니다
          </h2>
          <p className="mt-3 text-gray-500">실제 감사 리포트 미리보기</p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-gray-50 px-6 py-4">
              <div>
                <p className="text-lg font-bold text-gray-900">감사 리포트</p>
                <p className="text-sm text-gray-500">32평 올수리 · 시장 450건 기준</p>
              </div>
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-800">
                전체 판정: WARN
              </span>
            </div>

            {/* Table */}
            <div className="px-6 py-4">
              <StaggerContainer className="space-y-2" staggerDelay={0.08}>
                {/* Header row */}
                <div className="grid grid-cols-12 gap-2 px-3 text-xs font-medium text-gray-400">
                  <span className="col-span-3">공정</span>
                  <span className="col-span-2 text-right">내 견적</span>
                  <span className="col-span-4 text-center">시장 위치</span>
                  <span className="col-span-1 text-right">P50</span>
                  <span className="col-span-2 text-right">판정</span>
                </div>

                {mockItems.map((item) => (
                  <StaggerItem key={item.process}>
                    <div className="grid grid-cols-12 items-center gap-2 rounded-xl bg-gray-50 px-3 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md">
                      <span className="col-span-3 text-sm font-medium text-gray-800">
                        {item.process}
                      </span>
                      <span className="col-span-2 text-right text-sm font-semibold text-gray-700">
                        {item.my}만
                      </span>
                      <div className="col-span-4 px-1">
                        <div className="h-2 rounded-full bg-gray-200">
                          <div
                            className={`h-2 rounded-full ${barColor[item.verdict]}`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                      <span className="col-span-1 text-right text-xs text-gray-400">
                        {item.p50}만
                      </span>
                      <div className="col-span-2 text-right">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${verdictStyle[item.verdict]}`}>
                          {item.verdict}
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Missing alert */}
            <div className="mx-6 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-semibold text-red-800">⚠️ 누락 공정 발견</p>
              <p className="mt-1 text-xs text-red-600">
                바닥공사, 도장공사가 견적서에 포함되어 있지 않습니다.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 px-6 py-3">
              <p className="text-xs text-gray-400">
                모든 수치는 시장 450건 기준이며, 실제 시공 조건에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

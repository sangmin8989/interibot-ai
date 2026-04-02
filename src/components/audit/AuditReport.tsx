"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RiskBadge from "./RiskBadge";
import ProcessTable from "./ProcessTable";
import PercentileChart from "./PercentileChart";
import MissingAlert from "./MissingAlert";
import type { AuditReport as AuditReportType } from "@/types";

function formatWon(amount: number) {
  return `${Math.round(amount / 10000).toLocaleString()}만원`;
}

export default function AuditReport({ report }: { report: AuditReportType }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 전체 판정 */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">전체 판정</p>
            <div className="mt-1 flex items-center gap-3">
              <RiskBadge verdict={report.overallVerdict} />
              <span className="text-lg font-bold">
                내 견적: {formatWon(report.totalAmount)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              시장 P50 기준: {formatWon(report.benchmarkP50Total)}
            </p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            {report.source}
          </div>
        </CardContent>
      </Card>

      {/* 누락 공정 경고 */}
      <MissingAlert processes={report.missingProcesses} />

      {/* 공정별 비교표 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">공정별 비교표</CardTitle>
        </CardHeader>
        <CardContent>
          <ProcessTable items={report.items} />
        </CardContent>
      </Card>

      {/* 백분위 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">백분위 위치</CardTitle>
          <p className="text-sm text-muted-foreground">
            시장 데이터 대비 내 견적의 위치 ({report.source})
          </p>
        </CardHeader>
        <CardContent>
          <PercentileChart items={report.items} />
        </CardContent>
      </Card>

      {/* 출처 안내 */}
      <p className="text-center text-xs text-muted-foreground">
        모든 수치는 {report.source}이며, 실제 시공 조건에 따라 달라질 수 있습니다.
        <br />
        주관적 판단이 아닌 백분위 기반 객관적 위치 정보입니다.
      </p>

      {/* CTA */}
      <div className="flex justify-center gap-3">
        <Link href="/hvi">
          <Button
            size="lg"
            className="bg-orange text-orange-foreground hover:bg-orange/90"
          >
            집값 분석도 보기
          </Button>
        </Link>
        <Link href="/chat">
          <Button size="lg" variant="outline">
            AI에게 질문하기
          </Button>
        </Link>
      </div>
    </div>
  );
}

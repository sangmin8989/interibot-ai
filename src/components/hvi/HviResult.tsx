"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HviResult } from "@/types";

function formatWon(amount: number) {
  if (amount >= 100000000) return `${(amount / 100000000).toFixed(1)}억원`;
  return `${Math.round(amount / 10000).toLocaleString()}만원`;
}

export default function HviResultCard({ result }: { result: HviResult }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            예상 집값 상승 (HVI)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-orange">
            +{formatWon(result.hvi)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            투자 회수율 (ROI)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{result.roi}%</p>
          <p className="text-xs text-muted-foreground">
            공사비 대비 집값 상승 기대
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            생활 개선 지수 (LII)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{result.lii}/100</p>
          <p className="text-xs text-muted-foreground">
            생활 편의 개선 정도
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

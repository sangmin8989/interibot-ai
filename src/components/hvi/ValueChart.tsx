"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatWon(amount: number) {
  return `${Math.round(amount / 10000).toLocaleString()}만원`;
}

interface Props {
  totalCost: number;
  hvi: number;
}

export default function ValueChart({ totalCost, hvi }: Props) {
  const roiPercent = totalCost > 0 ? Math.round((hvi / totalCost) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">투자 vs 기대 수익</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span>공사비 투자</span>
            <span className="font-medium">{formatWon(totalCost)}</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-foreground/30" style={{ width: "100%" }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span>예상 집값 상승</span>
            <span className="font-medium text-orange">+{formatWon(hvi)}</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-orange"
              style={{ width: `${Math.min(100, roiPercent)}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          공사비 대비 약 {roiPercent}%의 집값 상승이 기대됩니다.
          {roiPercent >= 60 && " 투자 가치가 높은 수준입니다."}
          {roiPercent < 40 && " 생활 개선 효과 위주로 판단하시는 것이 좋습니다."}
        </p>
      </CardContent>
    </Card>
  );
}

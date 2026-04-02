"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HviResultCard from "@/components/hvi/HviResult";
import ValueChart from "@/components/hvi/ValueChart";
import ProcessRoi from "@/components/hvi/ProcessRoi";
import type { HviResult } from "@/types";
import Link from "next/link";

export default function HviPage() {
  const [result, setResult] = useState<HviResult | null>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 간이 입력 폼으로 시작
  const [areaPy, setAreaPy] = useState("32");
  const [processes, setProcesses] = useState([
    { name: "목공사", amount: "820" },
    { name: "타일공사", amount: "650" },
    { name: "전기공사", amount: "380" },
    { name: "설비공사", amount: "320" },
    { name: "도배공사", amount: "280" },
    { name: "도장공사", amount: "250" },
    { name: "바닥공사", amount: "450" },
  ]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const quote = {
        items: processes
          .filter((p) => p.amount)
          .map((p) => ({
            processName: p.name,
            amount: Number(p.amount) * 10000,
          })),
        totalAmount: processes.reduce(
          (sum, p) => sum + (Number(p.amount) || 0) * 10000,
          0
        ),
      };

      const res = await fetch("/api/hvi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote, areaPy: Number(areaPy) }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();
      setResult(data.result);
      setTotalCost(quote.totalAmount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
        <h1 className="text-3xl font-bold">집값 분석 결과</h1>
        <HviResultCard result={result} />
        <ValueChart totalCost={totalCost} hvi={result.hvi} />
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">공정별 ROI</CardTitle>
            <p className="text-sm text-muted-foreground">
              어떤 공정이 집값에 가장 효과적인지 확인하세요
            </p>
          </CardHeader>
          <CardContent>
            <ProcessRoi data={result.processRoi} />
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-medium">우선 투자 공정 추천</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.processRoi.slice(0, 3).map((p) => (
                  <span
                    key={p.processName}
                    className="rounded-md bg-orange/10 px-2 py-1 text-sm font-medium text-orange"
                  >
                    {p.processName} (ROI {p.roi}%)
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-muted-foreground">
            * ROI는 업종 평균 기반 추정치이며, 실제 매매가는 시장 상황에 따라 달라질 수 있습니다.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={() => setResult(null)}>
            다시 분석하기
          </Button>
          <Link href="/chat">
            <Button className="bg-orange text-orange-foreground hover:bg-orange/90">
              AI에게 질문하기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold">집값 분석</h1>
      <p className="mt-2 text-muted-foreground">
        견적 정보를 입력하면 리모델링 후 예상 집값 상승을 분석합니다.
      </p>

      <Card className="mt-6">
        <CardContent className="space-y-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">평수</label>
            <input
              type="number"
              value={areaPy}
              onChange={(e) => setAreaPy(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              공정별 금액 (만원)
            </label>
            <div className="space-y-2">
              {processes.map((p, i) => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="w-20 text-sm">{p.name}</span>
                  <input
                    type="number"
                    value={p.amount}
                    onChange={(e) => {
                      const updated = [...processes];
                      updated[i] = { ...p, amount: e.target.value };
                      setProcesses(updated);
                    }}
                    className="flex-1 rounded-md border px-3 py-1.5 text-sm"
                    placeholder="만원"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full bg-orange text-orange-foreground hover:bg-orange/90"
          >
            {isLoading ? "분석 중..." : "집값 분석 시작"}
          </Button>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        /audit에서 견적서를 분석하면 자동으로 데이터가 연결됩니다.
      </p>
    </div>
  );
}

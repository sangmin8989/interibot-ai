"use client";

import Link from "next/link";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StyleMatchResult } from "@/lib/data/style-mapping";
import type { ProcessRecommendation } from "@/lib/data/process-weights";

interface Props {
  radarData: { axis: string; value: number }[];
  styleDetails: {
    primary: StyleMatchResult;
    secondary?: StyleMatchResult;
  };
  processes: ProcessRecommendation[];
  spacePriority: { space: string; score: number }[];
}

export default function ProfileResult({
  radarData,
  styleDetails,
  processes,
  spacePriority,
}: Props) {
  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h1 className="text-2xl font-bold">나의 인테리어 성향 프로파일</h1>
        <p className="mt-1 text-muted-foreground">
          15가지 질문 기반 분석 결과
        </p>
      </div>

      {/* 레이더 차트 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">성향 분석 차트</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar
                dataKey="value"
                stroke="hsl(var(--orange))"
                fill="hsl(var(--orange))"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 매칭 스타일 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">매칭된 스타일</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-orange/30 bg-orange/5 p-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-orange text-orange-foreground">
                1순위
              </Badge>
              <span className="text-lg font-bold">
                {styleDetails.primary.style}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {styleDetails.primary.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {styleDetails.primary.keywords.map((kw) => (
                <Badge key={kw} variant="secondary" className="text-xs">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
          {styleDetails.secondary && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">2순위</Badge>
                <span className="font-semibold">
                  {styleDetails.secondary.style}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {styleDetails.secondary.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 공간 우선순위 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">공간 우선순위</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-muted-foreground">
            어디에 먼저 투자하면 만족도가 높을까요?
          </p>
          <div className="space-y-2">
            {spacePriority.slice(0, 4).map((sp, i) => (
              <div key={sp.space} className="flex items-center gap-3">
                <span className="w-5 text-right text-sm font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="w-12 font-medium">{sp.space}</span>
                <div className="flex-1">
                  <div className="h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-orange/70 transition-all"
                      style={{ width: `${sp.score}%` }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right text-sm text-muted-foreground">
                  {sp.score}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 추천 공정 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">추천 공정 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {processes.map((p) => (
              <div
                key={p.process}
                className="flex items-center justify-between rounded-lg border px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      p.priority === "필수"
                        ? "default"
                        : p.priority === "권장"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      p.priority === "필수" ? "bg-orange text-orange-foreground" : ""
                    }
                  >
                    {p.priority}
                  </Badge>
                  <span className="font-medium">{p.process}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {p.reason}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-center text-muted-foreground">
          성향에 맞는 견적서를 받으셨나요? 시장가 대비 분석해드려요.
        </p>
        <Link href="/audit">
          <Button
            size="lg"
            className="bg-orange text-orange-foreground hover:bg-orange/90"
          >
            견적서 분석하러 가기
          </Button>
        </Link>
      </div>
    </div>
  );
}

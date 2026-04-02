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
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import type { StyleMatchResult } from "@/lib/data/style-mapping";
import type { ProcessRecommendation } from "@/lib/data/process-weights";

interface Props {
  radarData: { axis: string; value: number }[];
  styleDetails: { primary: StyleMatchResult; secondary?: StyleMatchResult };
  processes: ProcessRecommendation[];
  spacePriority: { space: string; score: number }[];
}

export default function ProfileResult({ radarData, styleDetails, processes, spacePriority }: Props) {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <FadeIn className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          나의 인테리어 성향 프로파일
        </h1>
        <p className="mt-2 text-gray-500">15가지 질문 기반 분석 결과</p>
      </FadeIn>

      {/* Radar chart */}
      <FadeIn delay={0.1}>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-gray-900">성향 분석 차트</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 13, fill: "#374151" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar dataKey="value" stroke="#D4764B" fill="#D4764B" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </FadeIn>

      {/* Style match */}
      <FadeIn delay={0.2}>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-gray-900">매칭된 스타일</h3>
          <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-bold text-white">
                1순위
              </span>
              <span className="text-xl font-bold text-gray-900">{styleDetails.primary.style}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{styleDetails.primary.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {styleDetails.primary.keywords.map((kw) => (
                <span key={kw} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                  {kw}
                </span>
              ))}
            </div>
          </div>
          {styleDetails.secondary && (
            <div className="mt-3 rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-bold text-gray-600">2순위</span>
                <span className="font-bold text-gray-800">{styleDetails.secondary.style}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{styleDetails.secondary.description}</p>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Space priority */}
      <FadeIn delay={0.3}>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-1 text-lg font-bold text-gray-900">공간 우선순위</h3>
          <p className="mb-5 text-sm text-gray-500">어디에 먼저 투자하면 만족도가 높을까요?</p>
          <div className="space-y-3">
            {spacePriority.slice(0, 4).map((sp, i) => (
              <div key={sp.space} className="flex items-center gap-4">
                <span className="w-6 text-right text-sm font-bold text-gray-400">{i + 1}</span>
                <span className="w-10 text-sm font-semibold text-gray-700">{sp.space}</span>
                <div className="flex-1">
                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 transition-all"
                      style={{ width: `${sp.score}%` }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right text-sm font-medium text-gray-500">{sp.score}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Processes */}
      <FadeIn delay={0.4}>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-gray-900">추천 공정 목록</h3>
          <StaggerContainer className="space-y-2" staggerDelay={0.06}>
            {processes.map((p) => (
              <StaggerItem key={p.process}>
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        p.priority === "필수"
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                          : p.priority === "권장"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {p.priority}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{p.process}</span>
                  </div>
                  <span className="text-xs text-gray-500">{p.reason}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.5} className="flex flex-col items-center gap-4 py-6">
        <p className="text-center text-gray-500">
          성향에 맞는 견적서를 받으셨나요? 시장가 대비 분석해드려요.
        </p>
        <Link
          href="/audit"
          className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:scale-105"
        >
          견적서 분석하러 가기
        </Link>
      </FadeIn>
    </div>
  );
}

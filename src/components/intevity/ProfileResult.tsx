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
import { FadeIn } from "@/components/shared/motion";
import type { IntevityResult } from "@/lib/engine/intevity";
import type { ProcessRecommendation } from "@/lib/data/process-weights";
import { HABITS } from "@/lib/intevity/habits";
import { PLOT_TWISTS } from "@/lib/intevity/plotTwists";
import { RED_FLAGS } from "@/lib/intevity/redFlags";
import { MATERIALS } from "@/lib/intevity/materials";
import type { AxisName } from "@/lib/engine/intevity";
import ShareBar from "@/components/intevity/ShareBar";
import { useRef } from "react";

interface Props {
  radarData: { axis: string; value: number }[];
  result: IntevityResult;
  processes: ProcessRecommendation[];
  spacePriority: { space: string; score: number }[];
}

export default function ProfileResult({
  radarData,
  result,
  processes,
  spacePriority,
}: Props) {
  const captureRef = useRef<HTMLDivElement>(null);
  const { mainType, subTypes, topAxes, bottomAxis, percentile, axes } = result;
  const habits = HABITS[mainType.id] ?? [];
  const plotTwist = PLOT_TWISTS[mainType.id] ?? "";
  const materials = MATERIALS[mainType.id] ?? [];

  // RedFlags: 15축 중 70+ 인 축의 경고
  const activeRedFlags: string[] = [];
  for (const [axisName, value] of Object.entries(axes)) {
    const flag = RED_FLAGS[axisName as AxisName];
    if (flag && value >= flag.threshold) {
      activeRedFlags.push(...flag.warnings.slice(0, 1));
    }
  }

  // 시그니처 컬러 밝기 판단 (밝은 배경이면 텍스트 어둡게)
  const isLightBg =
    mainType.sigColor === "#F1EFE8" ||
    mainType.sigColor === "#E8D5B7" ||
    mainType.sigColor === "#E8B4B8" ||
    mainType.sigColor === "#D4C4A8" ||
    mainType.sigColor === "#C5B9A8" ||
    mainType.sigColor === "#C4956A";

  const heroTextColor = isLightBg ? "text-black/80" : "text-white";
  const heroSubColor = isLightBg ? "text-black/50" : "text-white/70";
  const heroBadgeColor = isLightBg
    ? "border-black/10 text-black/40"
    : "border-white/20 text-white/50";

  return (
    <div className="mx-auto max-w-xl space-y-20 pb-24" ref={captureRef}>
      {/* ────────────────────────────────────────────
          섹션 1: TypeHero — 시그니처 컬러 히어로
         ──────────────────────────────────────────── */}
      <FadeIn className="text-center">
        <div className="-mx-6 p-12" style={{ backgroundColor: mainType.sigColor }}>
          <p className="text-6xl">{mainType.emoji}</p>
          <h1
            className={`mt-6 text-[clamp(1.5rem,4vw,2rem)] font-bold ${heroTextColor}`}
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {mainType.archetype}
          </h1>
          <p className={`mt-3 text-base leading-relaxed ${heroSubColor}`}>
            {mainType.oneLiner}
          </p>
          <span
            className={`mt-6 inline-block border px-4 py-1.5 text-xs ${heroBadgeColor}`}
          >
            전체 사용자의 {percentile}%에 해당하는 타입입니다
          </span>
        </div>
      </FadeIn>

      {/* ────────────────────────────────────────────
          섹션 2: PlotTwist — 반전 매력
         ──────────────────────────────────────────── */}
      {plotTwist && (
        <FadeIn delay={0.05}>
          <p className="text-[9px] tracking-[0.5em] text-[#C6A376]">
            PLOT TWIST
          </p>
          <h3
            className="mt-4 text-lg font-light text-black/70"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            당신을 더 깊이 들여다보면...
          </h3>
          <p className="mt-4 text-sm leading-[1.9] text-black/55 whitespace-pre-line">
            {plotTwist}
          </p>
        </FadeIn>
      )}

      {/* ────────────────────────────────────────────
          섹션 3: HabitCopy — 습관 공감
         ──────────────────────────────────────────── */}
      {habits.length > 0 && (
        <FadeIn delay={0.1}>
          <p className="text-[9px] tracking-[0.5em] text-[#C6A376]">
            WE KNOW YOU
          </p>
          <h3
            className="mt-4 text-lg font-light text-black/70"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            당신을 알아봤습니다
          </h3>
          <div className="mt-6 space-y-4">
            {habits.map((habit, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 text-[#C6A376]">☑</span>
                <p className="text-sm leading-relaxed text-black/60">{habit}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* ────────────────────────────────────────────
          섹션 4: RadarChart + AxisHighlight
         ──────────────────────────────────────────── */}
      <FadeIn delay={0.15}>
        <p className="text-[9px] tracking-[0.5em] text-[#C6A376]">
          15-AXIS ANALYSIS
        </p>
        <div className="mt-6 border border-black/[0.06] p-6">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="58%">
              <PolarGrid stroke="rgba(0,0,0,0.04)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fontSize: 8, fill: "rgba(0,0,0,0.3)" }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar
                dataKey="value"
                stroke="#C6A376"
                fill="#C6A376"
                fillOpacity={0.08}
                strokeWidth={1.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-2">
          {topAxes.map((axis, i) => (
            <p key={axis.name} className="text-sm text-black/60">
              {i === 0 ? "🏆" : "⭐"} 당신의 강점:{" "}
              <span className="font-medium text-[#C6A376]">{axis.name}</span> —
              상위 {Math.max(3, Math.round(100 - axis.value * 0.9))}%
            </p>
          ))}
          <p className="text-sm text-black/40">
            😅 의외의 포인트: {bottomAxis.name}은(는) 좀 자유로운 편이에요
          </p>
        </div>
      </FadeIn>

      {/* ────────────────────────────────────────────
          섹션 5: StyleGuide — 추천 자재 + 컬러
         ──────────────────────────────────────────── */}
      {materials.length > 0 && (
        <FadeIn delay={0.2}>
          <p className="text-[9px] tracking-[0.5em] text-[#C6A376]">
            STYLE GUIDE
          </p>
          <h3
            className="mt-4 text-lg font-light text-black/70"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            추천 자재 라이브러리
          </h3>
          <div className="mt-6 space-y-4">
            {materials.map((mat, i) => (
              <div
                key={i}
                className="flex gap-4 border border-black/[0.06] p-4"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden bg-black/[0.03]">
                  {mat.imageUrl && !mat.imageUrl.startsWith("/") ? (
                    <img src={mat.imageUrl} alt={mat.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-xs text-black/20">{mat.brand}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-[#C6A376]">{mat.brand}</p>
                  <p className="mt-1 text-sm font-medium text-black/70">
                    {mat.name}
                  </p>
                  <p className="mt-1 text-xs text-black/40">
                    {mat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* ────────────────────────────────────────────
          섹션 6: RedFlags — 피해야 할 인테리어 처방전
         ──────────────────────────────────────────── */}
      {activeRedFlags.length > 0 && (
        <FadeIn delay={0.25}>
          <p className="text-[9px] tracking-[0.5em] text-[#C6A376]">
            RED FLAGS
          </p>
          <h3
            className="mt-4 text-lg font-light text-black/70"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            피해야 할 인테리어 처방전
          </h3>
          <div className="mt-6 space-y-4">
            {activeRedFlags.slice(0, 3).map((warning, i) => (
              <div key={i} className="flex items-start gap-3 border-l-2 border-[#C6A376]/30 pl-4">
                <p className="text-sm leading-relaxed text-black/55">
                  ⚠️ {warning}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* ────────────────────────────────────────────
          섹션 7: CTA 영역
         ──────────────────────────────────────────── */}
      <FadeIn delay={0.3} className="space-y-6 pt-8">
        <div className="mx-auto h-[0.5px] w-8 bg-[#C6A376]/20" />

        {/* 견적 연결 */}
        <Link
          href="/audit"
          className="block w-full bg-[#C6A376] py-4 text-center text-sm font-medium tracking-wide text-white transition hover:bg-[#B89366]"
        >
          이 스타일 기준으로 우리 집 견적을 알아볼까요? →
        </Link>

        {/* 커플 궁합 (Phase 2 — 비활성) */}
        <button
          disabled
          className="block w-full border border-black/[0.06] py-4 text-center text-sm text-black/30 cursor-not-allowed"
        >
          우리 부부 인테리어 궁합도 알아볼까요? (준비 중)
        </button>

        {/* 공유 바 */}
        <ShareBar
          typeId={mainType.id}
          archetype={mainType.archetype}
          oneLiner={mainType.oneLiner}
          captureRef={captureRef}
        />
      </FadeIn>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { AnalysisItem } from "@/types";
import { formatWon, getPositionStyle } from "@/lib/demo-data";

export default function RangeBar({ item }: { item: AnalysisItem }) {
  const [open, setOpen] = useState(false);
  const style = getPositionStyle(item.position);

  // 마커 위치 계산 (0-100%)
  const markerPct = Math.max(2, Math.min(98, item.positionRatio * 100));

  // 범위 바에서 P25-P75 구간 위치 (전체 스케일 대비)
  const iqr = item.rangeHigh - item.rangeLow;
  const scaleMin = Math.max(0, item.rangeLow - iqr * 0.5);
  const scaleMax = item.rangeHigh + iqr * 0.5;
  const scaleRange = scaleMax - scaleMin;
  const rangeStart = ((item.rangeLow - scaleMin) / scaleRange) * 100;
  const rangeWidth = ((item.rangeHigh - item.rangeLow) / scaleRange) * 100;

  const confidenceLabel = item.context.confidence === "high"
    ? `데이터 충분 (${item.context.sampleCount}건)`
    : item.context.confidence === "moderate"
    ? `참고용 (${item.context.sampleCount}건)`
    : `데이터 부족 (${item.context.sampleCount}건)`;

  return (
    <div className={`rounded-lg border ${style.border} bg-white p-4 transition-all lg:p-5`}>
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#1A1A1A]">{item.processName}</span>
          <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold ${style.bg} ${style.text}`}>{style.label}</span>
        </div>
        <span className="font-mono text-sm text-[#1A1A1A]/70">{formatWon(item.userAmount)}</span>
      </div>

      {/* Range Bar */}
      <div className="relative mt-3 h-2 w-full rounded-full bg-[#1A1A1A]/[0.04]">
        {/* 적정 범위 영역 */}
        <div
          className="absolute top-0 h-full rounded-full bg-[#C9A96E]/20"
          style={{ left: `${rangeStart}%`, width: `${rangeWidth}%` }}
        />
        {/* 마커 */}
        <div
          className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm ${item.position === "within" ? "bg-[#C9A96E]" : item.position === "above" ? "bg-[#1A1A1A]/70" : item.position === "upper" ? "bg-amber-500" : "bg-blue-400"}`}
          style={{ left: `${markerPct}%` }}
        />
      </div>

      {/* Range labels */}
      <div className="mt-1.5 flex justify-between text-[10px] text-[#1A1A1A]/30">
        <span>{formatWon(item.rangeLow)}</span>
        <span>적정 범위</span>
        <span>{formatWon(item.rangeHigh)}</span>
      </div>

      {/* Expandable context */}
      <button
        onClick={() => setOpen(!open)}
        className="mt-3 w-full text-left text-[11px] text-[#C9A96E] transition hover:text-[#1A1A1A]"
      >
        {open ? "접기 ▲" : "상세 보기 ▼"}
      </button>

      {open && (
        <div className="mt-2 space-y-2 border-t border-[#1A1A1A]/[0.04] pt-3 text-xs text-[#1A1A1A]/50">
          {(item.position === "upper" || item.position === "above") && item.context.possibleReasons.length > 0 && (
            <div>
              <p className="font-medium text-[#1A1A1A]/60">높을 수 있는 이유:</p>
              <ul className="mt-1 space-y-0.5 pl-3">
                {item.context.possibleReasons.map((r) => (
                  <li key={r} className="list-disc">{r}</li>
                ))}
              </ul>
            </div>
          )}
          {item.context.suggestedQuestion && (
            <div className="rounded-sm bg-[#C9A96E]/5 p-2.5">
              <p className="text-[10px] font-medium text-[#C9A96E]">시공사에 확인</p>
              <p className="mt-1 text-xs text-[#1A1A1A]/60 [word-break:keep-all]">{item.context.suggestedQuestion}</p>
            </div>
          )}
          <p className="text-[10px] text-[#1A1A1A]/25">{confidenceLabel} · {item.source}</p>
        </div>
      )}
    </div>
  );
}

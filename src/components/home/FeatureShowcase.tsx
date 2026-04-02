"use client";

import Link from "next/link";
import { SlideIn } from "@/components/shared/motion";
import { Sparkles, ClipboardCheck, TrendingUp, MessageCircle } from "lucide-react";
import { DEMO_AUDIT_REPORT, getStatusColor, formatWon, DEMO_HVI } from "@/lib/demo-data";
import { AnimatedBar } from "@/components/shared/motion";

interface FeatureProps {
  icon: React.ReactNode;
  label: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  mockup: React.ReactNode;
  reverse?: boolean;
  bg: string;
}

function FeatureBlock({ icon, label, title, desc, cta, href, mockup, reverse, bg }: FeatureProps) {
  return (
    <div className={bg}>
      <div
        className={`mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-20 md:py-28 lg:flex-row lg:gap-20 ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <SlideIn from={reverse ? "right" : "left"} className="flex-1 space-y-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B35]/10">
              {icon}
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B35]">
              {label}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] md:text-3xl lg:text-[2rem] lg:leading-snug">
            {title}
          </h3>
          <p className="max-w-md text-base leading-relaxed text-[#6B7280]">
            {desc}
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B35] transition hover:gap-2"
          >
            {cta} <span>→</span>
          </Link>
        </SlideIn>

        <SlideIn from={reverse ? "left" : "right"} delay={0.15} className="w-full flex-1">
          {mockup}
        </SlideIn>
      </div>
    </div>
  );
}

/* ─── Mockups ─── */

function IntevityMockup() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🎨</span>
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">색감 취향</span>
      </div>
      <p className="text-base font-semibold text-[#1A1A1A]">끌리는 공간 분위기는?</p>
      <div className="mt-4 space-y-2.5">
        {["화이트/그레이 — 깔끔한 무채색", "우드톤 — 따뜻한 자연 느낌", "컬러 포인트 — 나만의 개성"].map(
          (opt, i) => (
            <div
              key={opt}
              className={`rounded-xl border-2 px-4 py-3 text-sm transition-all ${
                i === 1
                  ? "border-[#FF6B35] bg-[#FF6B35]/5 font-medium text-[#1A1A1A]"
                  : "border-gray-100 text-[#6B7280] hover:border-[#FF6B35]/30"
              }`}
            >
              {opt}
            </div>
          )
        )}
      </div>
      <div className="mt-5 h-1.5 rounded-full bg-gray-100">
        <div className="h-1.5 w-[60%] rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-400" />
      </div>
      <p className="mt-1.5 text-right text-xs text-[#9CA3AF]">9 / 15</p>
    </div>
  );
}

function AuditMockup() {
  const items = DEMO_AUDIT_REPORT.processes.slice(0, 4);
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-bold text-[#1A1A1A]">공정별 비교</span>
        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">WARN</span>
      </div>
      <div className="space-y-2.5">
        {items.map((p) => {
          const sc = getStatusColor(p.status);
          return (
            <div key={p.name} className="flex items-center gap-3 rounded-lg bg-[#FAFAF9] px-3 py-2.5">
              <span className="w-14 shrink-0 text-xs font-medium text-[#1A1A1A]">{p.name}</span>
              <div className="flex-1">
                <AnimatedBar percent={p.percentile} color={sc.bar} />
              </div>
              <span className="font-mono text-xs text-[#9CA3AF]">P{p.percentile}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sc.bg} ${sc.text}`}>{p.status}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[10px] text-[#9CA3AF]">{DEMO_AUDIT_REPORT.data_source}</p>
    </div>
  );
}

function HviMockup() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-[#FF6B35]/5 p-3 text-center">
          <p className="text-xs text-[#9CA3AF]">HVI</p>
          <p className="text-lg font-bold text-[#FF6B35]">+{formatWon(DEMO_HVI.hvi)}</p>
        </div>
        <div className="rounded-xl bg-[#FAFAF9] p-3 text-center">
          <p className="text-xs text-[#9CA3AF]">ROI</p>
          <p className="text-lg font-bold text-[#1A1A1A]">{DEMO_HVI.roi}%</p>
        </div>
        <div className="rounded-xl bg-[#FAFAF9] p-3 text-center">
          <p className="text-xs text-[#9CA3AF]">LII</p>
          <p className="text-lg font-bold text-[#1A1A1A]">{DEMO_HVI.lii}등급</p>
        </div>
      </div>
      <div className="mt-4 space-y-2.5">
        {DEMO_HVI.processRoi.slice(0, 4).map((p) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="w-14 text-xs font-medium text-[#6B7280]">{p.name}</span>
            <div className="flex-1 h-2 rounded-full bg-gray-100">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-400" style={{ width: `${p.roi}%` }} />
            </div>
            <span className="w-10 text-right font-mono text-xs text-[#6B7280]">{p.roi}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-sm bg-[#F3F4F6] px-4 py-2.5 text-sm text-[#1A1A1A]">
            32평 올수리 보통 얼마야?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm border-l-2 border-[#FF6B35] bg-white px-4 py-2.5 text-sm text-[#374151] shadow-sm">
            32평 올수리(창호 포함, 확장 미포함) 기준 직접공사비 P50은 약 3,914만원입니다.
            <span className="mt-1.5 flex items-center gap-1 text-[10px] text-[#9CA3AF]">
              📊 시장 450건 기준
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["타일 브랜드 추천", "목공사 기간은?", "확장공사 장단점"].map((q) => (
          <span key={q} className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-[#6B7280] transition hover:border-[#FF6B35]/30 hover:text-[#FF6B35]">
            {q}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FeatureShowcase() {
  return (
    <div id="features">
      <FeatureBlock
        icon={<Sparkles className="h-4 w-4 text-[#FF6B35]" />}
        label="Personality"
        title="15가지 질문으로 나의 인테리어 DNA를 분석합니다"
        desc="공간감각, 색감 취향, 생활 루틴까지 분석하여 6가지 스타일 중 맞춤 스타일과 우선 투자 공간을 추천합니다."
        cta="무료 분석 시작"
        href="/intevity"
        mockup={<IntevityMockup />}
        bg="bg-white"
      />
      <FeatureBlock
        icon={<ClipboardCheck className="h-4 w-4 text-[#FF6B35]" />}
        label="Audit"
        title="받은 견적서가 적정한지 시장 데이터로 검증합니다"
        desc="견적서를 업로드하면 17개 공정별로 시장 데이터와 비교하여 백분위 위치, 누락 공정, 리스크를 분석합니다."
        cta="견적서 분석하기"
        href="/audit"
        mockup={<AuditMockup />}
        reverse
        bg="bg-[#FAFAF9]"
      />
      <FeatureBlock
        icon={<TrendingUp className="h-4 w-4 text-[#FF6B35]" />}
        label="Home Value"
        title="리모델링 후 예상 집값 상승과 ROI를 계산합니다"
        desc="국토부 실거래가와 공정별 ROI 데이터를 기반으로 투자 대비 예상 집값 상승을 분석합니다."
        cta="집값 분석 보기"
        href="/hvi"
        mockup={<HviMockup />}
        bg="bg-white"
      />
      <FeatureBlock
        icon={<MessageCircle className="h-4 w-4 text-[#FF6B35]" />}
        label="AI Consultant"
        title="인테리어 전문가 수준의 AI에게 자유롭게 질문하세요"
        desc="9,610건 인테리어 지식 데이터를 학습한 AI가 자재, 공정, 시공 방법까지 답변합니다."
        cta="AI 상담 시작"
        href="/chat"
        mockup={<ChatMockup />}
        reverse
        bg="bg-[#FAFAF9]"
      />
    </div>
  );
}

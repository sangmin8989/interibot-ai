"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tabs } from "@/lib/data/intevity-questions";
import type {
  MbtiData,
  CardSelectData,
  SliderData,
  MultiSelectData,
  ImageGridData,
} from "@/lib/data/intevity-questions";
import {
  analyzeProfile,
  calculateAxes,
  getTopAxisSoFar,
  AXIS_INSIGHTS,
  type TabAnswers,
  type AxisName,
} from "@/lib/engine/intevity";
import ProgressBar from "@/components/intevity/ProgressBar";
import MbtiSwiper from "@/components/intevity/flow/MbtiSwiper";
import BloodTypeCard from "@/components/intevity/flow/BloodTypeCard";
import AreaDial from "@/components/intevity/flow/AreaDial";
import FamilySelect from "@/components/intevity/flow/FamilySelect";
import ImageGrid from "@/components/intevity/flow/ImageGrid";
import BudgetCard from "@/components/intevity/flow/BudgetCard";
import ProfileResult from "@/components/intevity/ProfileResult";

const ease = [0.16, 1, 0.3, 1] as const;

// 7탭 + 중간피드백2 + 결과로딩 = 총 10 스텝이지만, 프로그레스바는 7탭 기준
const TOTAL_TABS = 7;

// 블러 단계: 탭1(25) → 탭7(1) → 결과(0)
const BLUR_LEVELS = [25, 21, 17, 13, 9, 5, 1, 0];

type FlowPhase =
  | "tab"
  | "mid-feedback-1"
  | "mid-feedback-2"
  | "analysis-loader"
  | "result";

export default function IntevityPage() {
  const [tabIdx, setTabIdx] = useState(0);
  const [phase, setPhase] = useState<FlowPhase>("tab");
  const [answers, setAnswers] = useState<Partial<TabAnswers>>({});
  const [result, setResult] = useState<ReturnType<typeof analyzeProfile> | null>(null);

  const currentTab = tabs[tabIdx];
  const blurLevel = phase === "result" ? 0 : BLUR_LEVELS[tabIdx] ?? 1;

  // 다음 탭으로 이동 (중간 피드백 삽입 포함)
  const advanceTab = useCallback(() => {
    const nextIdx = tabIdx + 1;

    // 탭4 완료 → 중간 피드백 #1
    if (tabIdx === 3 && phase === "tab") {
      setPhase("mid-feedback-1");
      return;
    }

    // 탭6 완료 → 중간 피드백 #2
    if (tabIdx === 5 && phase === "tab") {
      setPhase("mid-feedback-2");
      return;
    }

    // 탭7 완료 → 결과 로딩
    if (tabIdx === 6 && phase === "tab") {
      setPhase("analysis-loader");
      // 2.5초 후 결과 표시
      const fullAnswers = answers as TabAnswers;
      const analysisResult = analyzeProfile(fullAnswers);
      setTimeout(() => {
        setResult(analysisResult);
        setPhase("result");
      }, 2500);
      return;
    }

    if (nextIdx < tabs.length) {
      setTabIdx(nextIdx);
      setPhase("tab");
    }
  }, [tabIdx, phase, answers]);

  // 중간 피드백에서 "계속하기" 클릭
  const continueFeedback = useCallback(() => {
    setTabIdx((prev) => prev + 1);
    setPhase("tab");
  }, []);

  // ── 탭 핸들러 ──

  const handleMbti = useCallback(
    (mbtiResult: Record<string, string>) => {
      setAnswers((prev) => ({
        ...prev,
        mbti: mbtiResult as TabAnswers["mbti"],
      }));
      advanceTab();
    },
    [advanceTab]
  );

  const handleBloodType = useCallback(
    (id: string) => {
      setAnswers((prev) => ({
        ...prev,
        bloodType: id as TabAnswers["bloodType"],
      }));
      setTimeout(advanceTab, 100);
    },
    [advanceTab]
  );

  const handleArea = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, area: value }));
      advanceTab();
    },
    [advanceTab]
  );

  const handleFamily = useCallback(
    (selected: string[]) => {
      setAnswers((prev) => ({ ...prev, family: selected }));
      advanceTab();
    },
    [advanceTab]
  );

  const handlePainPoints = useCallback(
    (selected: string[]) => {
      setAnswers((prev) => ({ ...prev, painPoints: selected }));
      advanceTab();
    },
    [advanceTab]
  );

  const handleBudget = useCallback(
    (id: string) => {
      setAnswers((prev) => ({
        ...prev,
        budget: id as TabAnswers["budget"],
      }));
      setTimeout(advanceTab, 100);
    },
    [advanceTab]
  );

  const handleMood = useCallback(
    (selected: string[]) => {
      setAnswers((prev) => ({ ...prev, mood: selected[0] }));
      advanceTab();
    },
    [advanceTab]
  );

  // ── 중간 피드백 데이터 계산 ──

  const getMidFeedbackData = () => {
    // 현재까지의 축 계산 (불완전한 답변으로)
    const partialAnswers: TabAnswers = {
      mbti: answers.mbti ?? { EI: "E", SN: "S", TF: "T", JP: "J" },
      bloodType: answers.bloodType ?? "A",
      area: answers.area ?? 32,
      family: answers.family ?? ["alone"],
      painPoints: answers.painPoints ?? [],
      budget: answers.budget ?? "balanced",
      mood: answers.mood ?? "mood-natural",
    };
    const axes = calculateAxes(partialAnswers);
    const top = getTopAxisSoFar(axes);
    return { axes, top };
  };

  // ── 결과 화면 ──

  if (phase === "result" && result) {
    return (
      <div className="min-h-screen bg-[#F4EFEA]">
        <div className="px-6 py-20">
          <ProfileResult
            radarData={result.radarData}
            result={result.result}
            processes={result.processes}
            spacePriority={result.spacePriority}
          />
        </div>
      </div>
    );
  }

  // ── 분석 로딩 ──

  if (phase === "analysis-loader") {
    return <AnalysisLoaderInline />;
  }

  // ── 중간 피드백 #1 ──

  if (phase === "mid-feedback-1") {
    const { top } = getMidFeedbackData();
    return (
      <MidFeedbackScreen
        topAxis={top}
        onContinue={continueFeedback}
      />
    );
  }

  // ── 중간 피드백 #2 ──

  if (phase === "mid-feedback-2") {
    // 현재까지의 데이터로 임시 스타일 추론
    const partialAnswers: TabAnswers = {
      mbti: answers.mbti ?? { EI: "E", SN: "S", TF: "T", JP: "J" },
      bloodType: answers.bloodType ?? "A",
      area: answers.area ?? 32,
      family: answers.family ?? ["alone"],
      painPoints: answers.painPoints ?? [],
      budget: answers.budget ?? "balanced",
      mood: answers.mood ?? "mood-natural",
    };
    const tempResult = analyzeProfile(partialAnswers);
    const styleName = tempResult.result.mainType.name;

    return (
      <AlmostThereScreen styleName={styleName} onContinue={continueFeedback} />
    );
  }

  // ── 메인 탭 플로우 ──

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#F4EFEA]">
      {/* 블러 배경 */}
      <div
        className="pointer-events-none fixed inset-0 bg-gradient-to-br from-[#F4EFEA] via-[#E8D5B7] to-[#C6A376]/20 transition-[filter] duration-800 ease-out"
        style={{ filter: `blur(${blurLevel}px)` }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex min-h-dvh flex-col">
        {/* 프로그레스 */}
        <div className="px-6 pt-20">
          <ProgressBar current={tabIdx + 1} total={TOTAL_TABS} />
        </div>

        {/* 뒤로 가기 */}
        <div className="mx-auto flex w-full max-w-md items-center px-6 pt-4">
          {tabIdx > 0 ? (
            <button
              onClick={() => {
                setTabIdx((i) => i - 1);
                setPhase("tab");
              }}
              className="text-xs text-black/40 transition hover:text-black/70"
            >
              ← 이전
            </button>
          ) : (
            <span />
          )}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`tab-${currentTab.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease }}
              className="w-full max-w-md"
            >
              {/* 탭 제목 */}
              <div className="mb-8 text-center">
                <h2
                  className="text-[clamp(1.25rem,3.5vw,1.75rem)] font-light leading-snug text-black/90"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {currentTab.title}
                </h2>
                {currentTab.subtitle && (
                  <p className="mt-2 text-sm text-black/40">
                    {currentTab.subtitle}
                  </p>
                )}
              </div>

              {/* 탭별 컴포넌트 렌더링 */}
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  function renderTab() {
    const tab = currentTab;

    switch (tab.type) {
      case "swipe":
        return (
          <MbtiSwiper
            pairs={(tab.data as MbtiData).pairs}
            onComplete={handleMbti}
          />
        );
      case "card-select":
        if (tab.id === 2) {
          return (
            <BloodTypeCard
              options={(tab.data as CardSelectData).options}
              onSelect={handleBloodType}
            />
          );
        }
        // 탭6: 예산
        return (
          <BudgetCard
            options={(tab.data as CardSelectData).options}
            onSelect={handleBudget}
          />
        );
      case "slider":
        const sliderData = tab.data as SliderData;
        return (
          <AreaDial
            min={sliderData.min}
            max={sliderData.max}
            defaultValue={sliderData.defaultValue}
            unit={sliderData.unit}
            label={sliderData.label}
            hapticThreshold={sliderData.hapticThreshold}
            onConfirm={handleArea}
          />
        );
      case "multi-select":
        const msData = tab.data as MultiSelectData;
        return (
          <FamilySelect
            options={msData.options}
            minSelect={msData.minSelect}
            onConfirm={handleFamily}
          />
        );
      case "image-grid":
        const igData = tab.data as ImageGridData;
        if (tab.id === 5) {
          return (
            <ImageGrid
              options={igData.options}
              maxSelect={igData.maxSelect}
              showLabel={igData.showLabel}
              onConfirm={handlePainPoints}
            />
          );
        }
        // 탭7: 분위기
        return (
          <ImageGrid
            options={igData.options}
            maxSelect={igData.maxSelect}
            showLabel={igData.showLabel}
            onConfirm={handleMood}
          />
        );
      default:
        return null;
    }
  }
}

// ── 인라인 중간 피드백 #1 ──

function MidFeedbackScreen({
  topAxis,
  onContinue,
}: {
  topAxis: { name: AxisName; value: number; percentile: number } | null;
  onContinue: () => void;
}) {
  const axisName = topAxis?.name ?? "공간감각";
  const pct = topAxis?.percentile ?? 12;
  const insight = AXIS_INSIGHTS[axisName] ?? "독특한 감각을 가지고 있어요";

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#F4EFEA] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md border border-[#C6A376]/20 bg-white/60 p-10 text-center backdrop-blur-xl"
        style={{ borderRadius: 0 }}
      >
        <p className="text-3xl">✨</p>
        <h3
          className="mt-4 text-xl font-light text-black/90"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          잠깐, 놀라운 발견!
        </h3>
        <p className="mt-6 text-sm leading-relaxed text-black/60">
          지금까지의 선택을 분석한 결과,
          <br />
          당신은{" "}
          <span className="font-medium text-[#C6A376]">
            {axisName}
          </span>
          이(가) 상위{" "}
          <span className="font-medium text-[#C6A376]">{pct}%</span>에
          해당합니다.
        </p>
        <p className="mt-4 text-sm text-black/50">{insight}</p>
        <p className="mt-2 text-xs text-black/30">
          조금만 더 알려주시면 정확한 결과를 드릴게요.
        </p>
        <button
          onClick={onContinue}
          className="mt-8 w-full bg-[#C6A376] py-4 text-sm font-medium tracking-wide text-white transition hover:bg-[#B89366]"
          style={{ borderRadius: 0 }}
        >
          계속하기 →
        </button>
      </motion.div>
    </div>
  );
}

// ── 인라인 중간 피드백 #2 (AlmostThere) ──

function AlmostThereScreen({
  styleName,
  onContinue,
}: {
  styleName: string;
  onContinue: () => void;
}) {
  const [showText, setShowText] = useState(false);

  // 타이핑 dots → 텍스트 표시
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-end bg-[#F4EFEA] px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* AI 비서 말풍선 */}
        <div
          className="border border-[#C6A376]/20 bg-white/80 p-8 backdrop-blur-lg"
          style={{ borderRadius: 0 }}
        >
          <p className="mb-4 text-xs text-[#C6A376]">💬 인테리</p>

          {!showText ? (
            <div className="flex gap-1 py-4">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="inline-block h-2 w-2 bg-[#C6A376]/40"
                  style={{ borderRadius: 0 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm leading-relaxed text-black/70">
                거의 다 왔어요!
                <br />
                마지막으로 당신이 끌리는 공간을 보여주세요.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-black/50">
                지금까지의 분석으로는...{" "}
                <span className="text-[#C6A376]">{styleName}</span> 스타일이
                <br />
                당신의 영혼을 쉬게 해줄 것 같아요
              </p>
            </motion.div>
          )}
        </div>

        <button
          onClick={onContinue}
          className="mt-6 w-full bg-[#C6A376] py-4 text-sm font-medium tracking-wide text-white transition hover:bg-[#B89366]"
          style={{ borderRadius: 0 }}
        >
          마지막 질문 보기 →
        </button>
      </motion.div>
    </div>
  );
}

// ── 인라인 분석 로딩 ──

function AnalysisLoaderInline() {
  const [step, setStep] = useState(0);

  const steps = [
    "15개 축 분석 중... (3/15)",
    "색감 취향 매핑... (7/15)",
    "스타일 매칭 중... (12/15)",
    "결과 생성 완료! (15/15)",
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#F4EFEA] px-6">
      {/* 골드 파티클 효과 */}
      <div className="relative mb-12">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-[#C6A376]"
            style={{
              left: `${Math.cos((i * Math.PI) / 3) * 40}px`,
              top: `${Math.sin((i * Math.PI) / 3) * 40}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* 카운터 텍스트 */}
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-black/50"
        >
          {steps[step]}
        </motion.p>
      </AnimatePresence>

      {step === 3 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg font-light text-black/80"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          당신의 인테리어 유형을 찾았습니다
        </motion.p>
      )}
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PairOption {
  label: string;
  value: string;
  image?: string;
}

interface Props {
  pairs: Array<{
    dimension: string;
    left: PairOption;
    right: PairOption;
  }>;
  onComplete: (result: Record<string, string>) => void;
}

const PLACEHOLDER_COLORS = [
  "bg-[#d4c4b0]",
  "bg-[#b8a99a]",
  "bg-[#c2b5a4]",
  "bg-[#a89888]",
];

export default function MbtiSwiper({ pairs, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const current = pairs[step];

  const handleSelect = useCallback(
    (side: "left" | "right") => {
      if (selected) return;

      const value = side === "left" ? current.left.value : current.right.value;
      setSelected(side);

      const nextResult = { ...result, [current.dimension]: value };

      setTimeout(() => {
        setSelected(null);

        if (step + 1 >= pairs.length) {
          onComplete(nextResult);
        } else {
          setResult(nextResult);
          setStep((s) => s + 1);
        }
      }, 400);
    },
    [selected, current, result, step, pairs.length, onComplete],
  );

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center">
      {/* Step indicator */}
      <div className="mb-6 flex gap-2">
        {pairs.map((_, i) => (
          <div
            key={i}
            className="h-1 w-8 transition-colors duration-300"
            style={{
              backgroundColor: i <= step ? "#C6A376" : "#d4c4b0",
              borderRadius: 0,
            }}
          />
        ))}
      </div>

      <p
        className="mb-2 text-xs uppercase tracking-widest"
        style={{ color: "#C6A376" }}
      >
        {current.dimension}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="grid w-full grid-cols-2 gap-4"
        >
          {/* Left card */}
          <Card
            option={current.left}
            isSelected={selected === "left"}
            colorClass={PLACEHOLDER_COLORS[step % PLACEHOLDER_COLORS.length]}
            onClick={() => handleSelect("left")}
          />

          {/* Right card */}
          <Card
            option={current.right}
            isSelected={selected === "right"}
            colorClass={
              PLACEHOLDER_COLORS[(step + 1) % PLACEHOLDER_COLORS.length]
            }
            onClick={() => handleSelect("right")}
          />
        </motion.div>
      </AnimatePresence>

      <p className="mt-6 text-sm text-neutral-400">
        {step + 1} / {pairs.length}
      </p>
    </div>
  );
}

function Card({
  option,
  isSelected,
  colorClass,
  onClick,
}: {
  option: PairOption;
  isSelected: boolean;
  colorClass: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={{
        scale: isSelected ? 1.02 : 1,
        borderColor: isSelected ? "#C6A376" : "transparent",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex cursor-pointer flex-col items-center border-2 border-transparent p-0"
      style={{ borderRadius: 0 }}
    >
      {option.image ? (
        <img
          src={option.image}
          alt={option.label}
          className="aspect-[4/5] w-full object-cover"
          style={{ borderRadius: 0 }}
        />
      ) : (
        <div
          className={`${colorClass} aspect-[4/5] w-full`}
          style={{ borderRadius: 0 }}
        />
      )}
      <span
        className="mt-3 block w-full py-2 text-center text-sm font-medium text-neutral-800"
        style={{ fontFamily: "Pretendard, sans-serif" }}
      >
        {option.label}
      </span>
    </motion.button>
  );
}

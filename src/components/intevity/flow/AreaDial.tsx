"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
  label: string;
  hapticThreshold?: number;
  onConfirm: (value: number) => void;
}

export default function AreaDial({
  min,
  max,
  defaultValue,
  unit,
  label,
  hapticThreshold = 40,
  onConfirm,
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const crossedRef = useRef(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      const prev = value;

      // Haptic feedback when crossing threshold
      if (hapticThreshold !== undefined) {
        const wasBelowOrAt = prev < hapticThreshold;
        const isAboveOrAt = next >= hapticThreshold;
        const wasAboveOrAt = prev >= hapticThreshold;
        const isBelowOrAt = next < hapticThreshold;

        if (
          (wasBelowOrAt && isAboveOrAt && !crossedRef.current) ||
          (wasAboveOrAt && isBelowOrAt && crossedRef.current)
        ) {
          crossedRef.current = isAboveOrAt;
          if (typeof navigator !== "undefined" && "vibrate" in navigator) {
            navigator.vibrate(10);
          }
        }
      }

      setValue(next);
    },
    [value, hapticThreshold],
  );

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4">
      {/* Label */}
      <p
        className="mb-6 text-center text-sm leading-relaxed text-neutral-500"
        style={{ fontFamily: "Pretendard, sans-serif" }}
      >
        {label}
      </p>

      {/* Large number display */}
      <motion.div
        key={value}
        initial={{ opacity: 0.6, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.12 }}
        className="mb-8 text-center"
      >
        <span
          className="text-6xl font-light text-neutral-900 md:text-7xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {value}
        </span>
        <span
          className="ml-1 text-2xl text-neutral-400"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {unit}
        </span>
      </motion.div>

      {/* Slider */}
      <div className="w-full">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="area-dial-slider w-full"
          style={{
            borderRadius: 0,
            background: `linear-gradient(to right, #c6a376 0%, #c6a376 ${((value - min) / (max - min)) * 100}%, #d4c4b0 ${((value - min) / (max - min)) * 100}%, #d4c4b0 100%)`,
          }}
        />

        {/* Min / Max labels */}
        <div className="mt-2 flex justify-between">
          <span
            className="text-xs text-neutral-400"
            style={{ fontFamily: "Pretendard, sans-serif" }}
          >
            {min}
            {unit}
          </span>
          <span
            className="text-xs text-neutral-400"
            style={{ fontFamily: "Pretendard, sans-serif" }}
          >
            {max}
            {unit}
          </span>
        </div>
      </div>

      {/* Confirm button */}
      <button
        type="button"
        onClick={() => onConfirm(value)}
        className="mt-10 w-full cursor-pointer px-8 py-4 text-sm font-semibold tracking-wide text-white transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "#C6A376",
          borderRadius: 0,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        다음
      </button>

      {/* Slider custom styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .area-dial-slider {
              -webkit-appearance: none;
              appearance: none;
              height: 4px;
              outline: none;
              border-radius: 0;
            }
            .area-dial-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 24px;
              height: 24px;
              background: #c6a376;
              border: 3px solid #fff;
              border-radius: 0;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
            }
            .area-dial-slider::-moz-range-thumb {
              width: 24px;
              height: 24px;
              background: #c6a376;
              border: 3px solid #fff;
              border-radius: 0;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
            }
          `,
        }}
      />
    </div>
  );
}

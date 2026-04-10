"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  options: Array<{ id: string; label: string; emoji: string }>;
  minSelect: number;
  onConfirm: (selected: string[]) => void;
}

export default function FamilySelect({ options, minSelect, onConfirm }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  const canConfirm = selected.length >= minSelect;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center">
      <div className="grid w-full grid-cols-3 gap-3">
        {options.map((opt, i) => {
          const isSelected = selected.includes(opt.id);
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              onClick={() => toggle(opt.id)}
              className="relative flex flex-col items-center gap-2 border-2 px-3 py-5 transition-all duration-200"
              style={{
                borderRadius: 0,
                borderColor: isSelected ? "#C6A376" : "#d4d0cc",
                backgroundColor: isSelected
                  ? "rgba(198,163,118,0.08)"
                  : "#FFFFFF",
              }}
            >
              {/* Gold checkmark overlay */}
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center"
                  style={{ color: "#C6A376" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5l3.5 3.5L13 4" />
                  </svg>
                </motion.span>
              )}

              <span className="text-[40px] leading-none">{opt.emoji}</span>
              <span
                className="text-xs font-medium text-gray-800"
                style={{ fontFamily: "var(--font-sans, sans-serif)" }}
              >
                {opt.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        disabled={!canConfirm}
        onClick={() => onConfirm(selected)}
        className="mt-8 w-full border-2 px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200"
        style={{
          borderRadius: 0,
          borderColor: "#C6A376",
          backgroundColor: canConfirm ? "#C6A376" : "transparent",
          color: canConfirm ? "#FFFFFF" : "#C6A376",
          opacity: canConfirm ? 1 : 0.45,
          cursor: canConfirm ? "pointer" : "not-allowed",
        }}
      >
        다음
      </motion.button>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  options: Array<{
    id: string;
    emoji?: string;
    label: string;
    subtitle?: string;
    description?: string;
  }>;
  onSelect: (id: string) => void;
}

export default function BudgetCard({ options, onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSelect(id: string) {
    setSelected(id);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSelect(id), 400);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-3">
      {options.map((opt, i) => {
        const isSelected = selected === opt.id;

        return (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isSelected ? 1.02 : 1,
            }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            onClick={() => handleSelect(opt.id)}
            className="flex flex-col items-start border-2 px-5 py-5 text-left transition-all duration-200"
            style={{
              borderRadius: 0,
              borderColor: isSelected ? "#C6A376" : "#d4d0cc",
              backgroundColor: isSelected
                ? "rgba(198,163,118,0.08)"
                : "#FFFFFF",
            }}
          >
            {opt.emoji && (
              <span className="mb-2 text-2xl leading-none">{opt.emoji}</span>
            )}
            <span
              className="text-base font-bold text-gray-900"
              style={{ fontFamily: "var(--font-heading, 'Cormorant Garamond', serif)" }}
            >
              {opt.label}
            </span>
            {opt.subtitle && (
              <span className="mt-1 text-sm text-gray-600">{opt.subtitle}</span>
            )}
            {opt.description && (
              <span className="mt-1.5 text-xs italic text-gray-400">
                {opt.description}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

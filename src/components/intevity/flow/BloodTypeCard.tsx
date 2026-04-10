"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  options: Array<{
    id: string;
    label: string;
    subtitle?: string;
    image?: string;
  }>;
  onSelect: (id: string) => void;
}

export default function BloodTypeCard({ options, onSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      if (selectedId) return;
      setSelectedId(id);

      setTimeout(() => {
        onSelect(id);
      }, 400);
    },
    [selectedId, onSelect],
  );

  return (
    <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            animate={{
              scale: isSelected ? 1.05 : 1,
              borderColor: isSelected ? "#C6A376" : "transparent",
            }}
            whileHover={{ scale: selectedId ? undefined : 1.02 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex cursor-pointer flex-col items-center border-2 border-transparent px-4 py-8"
            style={{
              borderRadius: 0,
              backgroundColor: isSelected
                ? "rgba(198, 163, 118, 0.08)"
                : "rgba(244, 239, 234, 0.6)",
            }}
          >
            {option.image ? (
              <img
                src={option.image}
                alt={option.label}
                className="mb-3 h-12 w-12 object-contain"
                style={{ borderRadius: 0 }}
              />
            ) : null}

            <span
              className="block text-3xl font-semibold text-neutral-900"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {option.label}
            </span>

            {option.subtitle && (
              <span
                className="mt-2 block text-xs text-neutral-500"
                style={{ fontFamily: "Pretendard, sans-serif" }}
              >
                {option.subtitle}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

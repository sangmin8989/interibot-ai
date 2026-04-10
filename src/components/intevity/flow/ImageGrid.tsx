"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  options: Array<{ id: string; label?: string; image: string }>;
  maxSelect: number;
  showLabel: boolean;
  onConfirm: (selected: string[]) => void;
}

export default function ImageGrid({
  options,
  maxSelect,
  showLabel,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [broken, setBroken] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      setSelected((prev) => {
        let next: string[];
        if (maxSelect === 1) {
          next = [id];
        } else {
          next = prev.includes(id)
            ? prev.filter((s) => s !== id)
            : prev.length < maxSelect
              ? [...prev, id]
              : prev;
        }

        // Auto-advance for single select
        if (maxSelect === 1) {
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => onConfirm(next), 400);
        }

        return next;
      });
    },
    [maxSelect, onConfirm],
  );

  function markBroken(id: string) {
    setBroken((prev) => new Set(prev).add(id));
  }

  const canConfirm = selected.length >= 1;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center">
      <div className="grid w-full grid-cols-2 gap-3">
        {options.map((opt, i) => {
          const isSelected = selected.includes(opt.id);
          const isBroken = broken.has(opt.id);

          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              onClick={() => handleSelect(opt.id)}
              className="relative aspect-square overflow-hidden border-2 transition-all duration-200"
              style={{
                borderRadius: 0,
                borderColor: isSelected ? "#C6A376" : "#d4d0cc",
              }}
            >
              {/* Image or placeholder */}
              {!isBroken ? (
                <Image
                  src={opt.image}
                  alt={opt.label ?? ""}
                  fill
                  className="object-cover"
                  onError={() => markBroken(opt.id)}
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{ backgroundColor: "#e8e4df" }}
                >
                  <span className="px-2 text-center text-sm text-gray-500">
                    {opt.label ?? opt.id}
                  </span>
                </div>
              )}

              {/* Gold overlay when selected */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(198,163,118,0.30)" }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center"
                    style={{ color: "#FFFFFF" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5.5 5.5L20 6" />
                    </svg>
                  </span>
                </motion.div>
              )}

              {/* Label */}
              {showLabel && opt.label && (
                <span className="absolute bottom-0 left-0 w-full bg-black/40 px-2 py-1 text-center text-xs font-medium text-white">
                  {opt.label}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* "다음" button only for multi-select */}
      {maxSelect > 1 && (
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
      )}
    </div>
  );
}

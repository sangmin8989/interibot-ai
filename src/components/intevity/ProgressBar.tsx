"use client";

import { motion } from "framer-motion";

export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="h-[2px] w-full bg-black/[0.06]">
        <motion.div
          className="h-full bg-[#C6A376]"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

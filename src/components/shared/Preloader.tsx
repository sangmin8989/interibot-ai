"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const letters = "INTERIBOT".split("");

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("preloader-seen");
    if (seen) { setShow(false); return; }
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("preloader-seen", "1");
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
        >
          {/* Letters */}
          <div className="flex items-baseline">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease }}
                className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-[0.25em] text-black"
              >
                {l}
              </motion.span>
            ))}
          </div>
          {/* Gold line expanding */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 1.2, duration: 0.8, ease }}
            className="mt-4 h-[0.5px] bg-[#C9A96E]"
          />
          {/* Subtle tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6, ease }}
            className="mt-3 text-[9px] tracking-[0.5em] text-black/25"
          >
            인테리어의 모든 답
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

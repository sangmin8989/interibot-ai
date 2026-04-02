"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="fixed right-3 top-1/2 z-[100] hidden h-24 w-[1px] -translate-y-1/2 bg-black/[0.04] md:block">
      <motion.div
        className="w-full origin-top bg-[#C9A96E]/50"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
}

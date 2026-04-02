"use client";

import VelocityMarquee from "@/components/shared/VelocityMarquee";

export default function MarqueeBand() {
  return (
    <div className="overflow-hidden border-y border-black/[0.04] bg-white py-4">
      <VelocityMarquee baseVelocity={0.8} className="text-[11px] tracking-[0.3em] text-black/10">
        AUDIT · PERSONALITY · HOME VALUE · CONSULTATION · 121,515 DATA · 450 CASES · 17 PROCESSES ·
      </VelocityMarquee>
    </div>
  );
}

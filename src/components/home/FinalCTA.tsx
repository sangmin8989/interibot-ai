"use client";

import Link from "next/link";
import { FadeIn } from "@/components/shared/motion";

/* Picasso: stark, almost empty, one bold gesture */

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0B] px-6 py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-[#FF6B35]/[0.05] blur-[120px]" />
      </div>

      <FadeIn className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-black leading-[1.1] tracking-tight text-white">
          지금 바로.
        </h2>
        <p className="mt-4 text-white/30">회원가입 없이. 무료로.</p>
        <div className="mt-12">
          <Link
            href="/audit"
            className="inline-flex rounded-full bg-[#FF6B35] px-10 py-4 text-base font-semibold text-white transition-all hover:shadow-[0_0_60px_rgba(255,107,53,0.3)]"
          >
            견적서 분석하기
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

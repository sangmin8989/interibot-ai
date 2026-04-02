"use client";

import Link from "next/link";
import { FadeIn } from "@/components/shared/motion";

/* Hermès: one sentence. One action. Absolute confidence. */

export default function FinalCTA() {
  return (
    <section className="bg-[#FAF9F7] px-6 py-40 md:py-52">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.3] text-[#1A1A1A]">
          확신을 드리겠습니다.
        </p>
        <div className="mt-14">
          <Link
            href="/audit"
            className="border-b border-[#1A1A1A] pb-1 text-[13px] font-medium tracking-wide text-[#1A1A1A] transition-all duration-500 hover:border-[#FF6B35] hover:text-[#FF6B35]"
          >
            견적서 분석하기
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

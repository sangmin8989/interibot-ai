"use client";

import Link from "next/link";
import { FadeIn } from "@/components/shared/motion";

export default function FinalCTA() {
  return (
    <section className="bg-white px-6 py-40 md:py-52">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-12 h-[0.5px] w-12 bg-[#C9A96E]/30" />
        <p className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.3] text-black">
          확신을 가지고<br />결정하십시오.
        </p>
        <div className="mt-16">
          <Link
            href="/audit"
            className="border-b border-black pb-1 text-[12px] font-medium tracking-[0.15em] text-black transition-all duration-500 hover:border-[#C9A96E] hover:text-[#C9A96E]"
          >
            시작하기
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

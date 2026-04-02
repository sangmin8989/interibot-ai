"use client";

import Link from "next/link";
import { FadeIn } from "@/components/shared/motion";

export default function FinalCTA() {
  return (
    <section className="bg-[#0A0A0B] px-4 py-24 md:py-32">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          지금 무료로 견적서를
          <br />
          분석해보세요
        </h2>
        <p className="mt-4 text-[#6B7280]">
          회원가입 없이 바로 사용할 수 있습니다
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/audit"
            className="inline-flex items-center justify-center rounded-xl bg-[#FF6B35] px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#FF6B35]/25"
          >
            견적서 분석하기
          </Link>
          <Link
            href="/intevity"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 px-8 py-4 text-base font-medium text-gray-400 transition-all hover:border-[#FF6B35]/40 hover:text-white"
          >
            성향분석 시작
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

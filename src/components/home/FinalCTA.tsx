"use client";

import Link from "next/link";
import { FadeIn } from "@/components/shared/motion";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-orange-500 to-amber-500 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            지금 바로 무료로 시작하세요
          </h2>
          <p className="mt-4 text-lg text-white/80">
            회원가입 없이 바로 사용할 수 있습니다
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/audit"
              className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-orange-600 transition hover:scale-105 hover:shadow-xl"
            >
              견적서 분석하기
            </Link>
            <Link
              href="/intevity"
              className="rounded-xl border-2 border-white/40 px-8 py-4 text-lg font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              성향분석 시작
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

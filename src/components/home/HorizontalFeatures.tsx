"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { DEMO_AUDIT_REPORT, DEMO_HVI, formatWon, getStatusColor } from "@/lib/demo-data";
import { AnimatedBar } from "@/components/shared/motion";

const features = [
  {
    label: "PERSONALITY",
    title: "당신이 원하는 공간이\n무엇인지부터.",
    desc: "15가지 질문이 공간감각, 생활 리듬, 미적 취향을 읽습니다.",
    href: "/intevity",
    color: "#C9A96E",
  },
  {
    label: "AUDIT",
    title: "견적서를 읽는\n눈을 드립니다.",
    desc: "17개 공정이 시장의 어디에 위치하는지. 빠진 항목은 없는지.",
    href: "/audit",
    color: "#C9A96E",
  },
  {
    label: "HOME VALUE",
    title: "공사 후의 가치를\n미리 봅니다.",
    desc: "어떤 공정이 집의 가치에 기여하는지. 데이터로 보여드립니다.",
    href: "/hvi",
    color: "#C9A96E",
  },
  {
    label: "CONSULTATION",
    title: "궁금한 것이 있으시면\n물어보십시오.",
    desc: "9,610건의 인테리어 지식을 학습한 AI가 답변합니다.",
    href: "/chat",
    color: "#C9A96E",
  },
];

export default function HorizontalFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import GSAP only on client
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });
      });
    })();

    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-black" id="features">
      <div ref={trackRef} className="flex h-screen w-max items-center">
        {/* First panel — section label */}
        <div className="flex h-screen w-screen shrink-0 flex-col justify-center px-12 md:px-24">
          <p className="text-[10px] tracking-[0.5em] text-[#C9A96E]">FEATURES</p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-white">네 가지 도구.</h2>
          <p className="mt-4 text-[14px] text-white/30">가로로 스크롤하여 살펴보세요 →</p>
        </div>

        {/* Feature panels */}
        {features.map((f, i) => (
          <div key={f.label} className="flex h-screen w-screen shrink-0 items-center px-12 md:px-24">
            <div className="flex w-full max-w-5xl flex-col gap-8 md:flex-row md:items-center md:gap-16">
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.5em] text-[#C9A96E]">{f.label}</p>
                <h3 className="mt-4 whitespace-pre-line font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.3] text-white">
                  {f.title}
                </h3>
                <p className="mt-4 max-w-sm text-[14px] leading-[2] text-white/30">{f.desc}</p>
                <Link
                  href={f.href}
                  className="mt-6 inline-block border-b border-white/15 pb-0.5 text-[11px] tracking-[0.1em] text-white/40 transition-all duration-500 hover:border-white hover:text-white"
                >
                  시작하기
                </Link>
              </div>

              {/* Visual — mini preview */}
              <div className="flex-1">
                {i === 0 && (
                  <div className="border border-white/[0.06] p-6">
                    <p className="text-[9px] tracking-[0.3em] text-[#C9A96E]/40">Q.09</p>
                    <p className="mt-3 font-serif text-base text-white">끌리는 공간 분위기는?</p>
                    <div className="mt-4">
                      {["화이트 — 절제된 공간", "우드톤 — 자연의 온기", "포인트 — 자기다운 공간"].map((o, j) => (
                        <div key={o} className={`border-b py-3 text-[12px] ${j === 1 ? "border-[#C9A96E]/20 text-white" : "border-white/[0.04] text-white/25"}`}>{o}</div>
                      ))}
                    </div>
                  </div>
                )}
                {i === 1 && (
                  <div className="border border-white/[0.06] p-6">
                    <p className="text-[9px] tracking-[0.3em] text-[#C9A96E]/40">REPORT</p>
                    <div className="mt-4 space-y-4">
                      {DEMO_AUDIT_REPORT.processes.slice(0, 4).map(p => {
                        const sc = getStatusColor(p.status);
                        return (
                          <div key={p.name} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-[11px] text-white/40">{p.name}</span>
                              <span className={`text-[9px] ${p.status === "PASS" ? "text-white/20" : "text-[#C9A96E]"}`}>{p.status}</span>
                            </div>
                            <AnimatedBar percent={p.percentile} color={p.status === "WARN" ? "bg-[#C9A96E]" : sc.bar} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {i === 2 && (
                  <div className="border border-white/[0.06] p-6 text-center">
                    <p className="font-serif text-3xl font-light text-[#C9A96E]">+{formatWon(DEMO_HVI.hvi)}</p>
                    <p className="mt-2 text-[11px] text-white/25">예상 집값 상승</p>
                    <div className="mt-4 flex justify-center gap-6 text-[12px] text-white/30">
                      <span>ROI {DEMO_HVI.roi}%</span>
                      <span>LII {DEMO_HVI.lii}등급</span>
                    </div>
                  </div>
                )}
                {i === 3 && (
                  <div className="border border-white/[0.06] p-6">
                    <div className="text-right"><span className="inline-block rounded bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/40">32평 올수리 얼마야?</span></div>
                    <div className="mt-2"><span className="inline-block border-l border-[#C9A96E]/20 pl-3 text-[11px] text-white/30">P50 기준 약 3,914만원입니다.</span></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

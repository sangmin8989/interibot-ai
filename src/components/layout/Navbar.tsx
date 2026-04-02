"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "성향분석", href: "/intevity" },
  { label: "견적서 감사", href: "/audit" },
  { label: "집값 분석", href: "/hvi" },
  { label: "AI 상담", href: "/chat" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-black/[0.06] bg-white/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#FF6B35] to-amber-500 bg-clip-text text-transparent">
              인테리봇
            </span>{" "}
            <span className={scrolled ? "text-[#1A1A1A]" : "text-white"}>AI</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-[#6B7280] hover:text-[#1A1A1A]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/audit"
              className="ml-4 rounded-lg bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#E85D2C]"
            >
              무료로 시작
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`rounded-lg p-2 md:hidden ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <span className="text-lg font-bold">
              <span className="text-[#FF6B35]">인테리봇</span> AI
            </span>
            <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-[#1A1A1A]">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2 px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-4 text-2xl font-semibold text-[#1A1A1A] transition hover:bg-[#FAFAF9]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="p-6">
            <Link
              href="/audit"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-[#FF6B35] py-4 text-center text-lg font-semibold text-white"
            >
              견적서 분석하기
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

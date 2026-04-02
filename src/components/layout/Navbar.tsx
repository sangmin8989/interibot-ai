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
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="text-xl font-bold">
          <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            인테리봇
          </span>{" "}
          <span className={scrolled ? "text-gray-800" : "text-white"}>AI</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/audit"
            className="ml-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
          >
            무료로 시작
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden rounded-lg p-2 ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-white px-4 pb-4 pt-2 shadow-lg md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/audit"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-center font-semibold text-white"
          >
            무료로 시작
          </Link>
        </div>
      )}
    </nav>
  );
}

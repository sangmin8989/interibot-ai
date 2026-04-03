"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const nav = [
  { label: "성향분석", href: "/intevity" },
  { label: "견적서 감사", href: "/audit" },
  { label: "집값 분석", href: "/hvi" },
  { label: "AI 상담", href: "/chat" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header className={`sticky left-0 top-0 z-[100] w-full transition-all duration-500 ${
        scrolled ? "border-b border-black/[0.04] bg-white/90 backdrop-blur-xl" : "bg-white"
      }`}>
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 lg:px-6">
          <Link href="/" className="text-sm font-bold tracking-[0.12em] text-black">
            INTERIBOT
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {nav.map((i) => (
              <Link key={i.href} href={i.href} className="text-xs text-black/50 transition-colors hover:text-black">
                {i.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/[0.04] transition lg:hidden"
          >
            {open ? <X className="h-4 w-4 text-black/60" /> : <Menu className="h-4 w-4 text-black/60" />}
          </button>
        </div>
      </header>

      {/* Mobile floating panel (archisketch style) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99] bg-black/10 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
              className="fixed left-[2dvw] right-[2dvw] top-20 z-[100] overflow-hidden rounded-xl bg-white shadow-2xl lg:hidden"
            >
              {/* CTA */}
              <div className="border-b border-black/[0.04] p-3">
                <Link
                  href="/audit"
                  onClick={() => setOpen(false)}
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-black text-sm font-semibold text-white active:scale-[0.97]"
                >
                  견적서 분석하기
                </Link>
              </div>
              {/* Nav links */}
              <div className="p-3">
                {nav.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3.5 text-sm font-medium text-black/70 active:bg-black/[0.03]"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile bottom CTA bar */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, ease }}
            className="fixed bottom-0 z-50 w-full border-t border-black/[0.04] bg-white/95 px-4 py-2.5 backdrop-blur-xl lg:hidden"
          >
            <Link
              href="/audit"
              className="flex h-12 w-full items-center justify-center rounded-lg bg-black text-sm font-semibold text-white active:scale-[0.97]"
            >
              견적서 분석하기
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

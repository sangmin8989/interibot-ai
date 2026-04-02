"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const navItems = [
  { label: "성향분석", href: "/intevity" },
  { label: "감사", href: "/audit" },
  { label: "집값", href: "/hvi" },
  { label: "상담", href: "/chat" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-700 ${
          scrolled
            ? "border-b border-[#1A1A1A]/[0.04] bg-[#FAF9F7]/80 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-baseline gap-1">
            <span className="font-serif text-[15px] font-bold tracking-tight text-[#1A1A1A]">
              인테리봇
            </span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[12px] tracking-[0.08em] text-[#1A1A1A]/40 transition-colors duration-500 hover:text-[#1A1A1A]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button onClick={() => setOpen(!open)} className="text-[#1A1A1A]/60 md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#FAF9F7] md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-serif text-[15px] font-bold">인테리봇</span>
              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5 text-[#1A1A1A]/60" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center px-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-[#1A1A1A]/[0.04] py-6 font-serif text-2xl font-light text-[#1A1A1A]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

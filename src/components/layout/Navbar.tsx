"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const nav = [
  { label: "성향분석", href: "/intevity" },
  { label: "감사", href: "/audit" },
  { label: "집값", href: "/hvi" },
  { label: "상담", href: "/chat" },
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
      <nav className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        scrolled ? "border-b border-black/[0.04] bg-white/90 backdrop-blur-2xl" : "bg-transparent"
      }`}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-[13px] font-bold tracking-[0.15em] text-black">
            INTERIBOT
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {nav.map((i) => (
              <Link key={i.href} href={i.href} className="text-[11px] tracking-[0.1em] text-black/30 transition-colors duration-500 hover:text-black">
                {i.label}
              </Link>
            ))}
          </div>

          <button onClick={() => setOpen(!open)} className="text-black/40 md:hidden">
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
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-[60] flex flex-col bg-white md:hidden"
          >
            <div className="flex h-14 items-center justify-between px-6">
              <span className="text-[13px] font-bold tracking-[0.15em]">INTERIBOT</span>
              <button onClick={() => setOpen(false)}><X className="h-5 w-5 text-black/40" /></button>
            </div>
            <div className="flex flex-1 flex-col justify-center px-6">
              {nav.map((i, idx) => (
                <motion.div key={i.href} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06, ease }}>
                  <Link href={i.href} onClick={() => setOpen(false)} className="block border-b border-black/[0.04] py-6 font-serif text-2xl font-light text-black">
                    {i.label}
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

import Link from "next/link";

/* Picasso: minimal, structured but with personality */

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#0A0A0B] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="text-sm font-black text-[#FF6B35]">인테리봇</span>
          <span className="ml-1 text-[10px] text-white/20">AI</span>
          <p className="mt-1 text-[11px] text-white/20">아르젠 스튜디오 &copy; 2026</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "성향분석", href: "/intevity" },
            { label: "감사", href: "/audit" },
            { label: "집값", href: "/hvi" },
            { label: "상담", href: "/chat" },
            { label: "이용약관", href: "#" },
            { label: "개인정보", href: "#" },
          ].map((l) => (
            <Link key={l.label} href={l.href} className="text-[11px] text-white/20 transition hover:text-white/50">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

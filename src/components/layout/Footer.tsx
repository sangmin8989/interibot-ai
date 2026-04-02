import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.04] bg-white px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] font-bold tracking-[0.15em] text-black/40">INTERIBOT</span>
          <span className="text-[9px] text-black/15">&copy; 2026 아르젠 스튜디오</span>
        </div>
        <div className="flex gap-8">
          {[
            { l: "성향분석", h: "/intevity" }, { l: "감사", h: "/audit" },
            { l: "집값", h: "/hvi" }, { l: "상담", h: "/chat" },
            { l: "이용약관", h: "#" }, { l: "개인정보", h: "#" },
          ].map((i) => (
            <Link key={i.l} href={i.h} className="text-[9px] tracking-[0.05em] text-black/15 transition-colors duration-500 hover:text-black/40">
              {i.l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

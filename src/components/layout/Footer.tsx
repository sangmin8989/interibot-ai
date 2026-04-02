import Link from "next/link";

/* Hermès: understated. A hallmark, not a billboard. */

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A]/[0.04] bg-[#FAF9F7] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-serif text-[13px] text-[#1A1A1A]/40">인테리봇</span>
          <p className="mt-1 text-[10px] text-[#1A1A1A]/15">아르젠 스튜디오 &copy; 2026</p>
        </div>
        <div className="flex gap-8">
          {[
            { label: "성향분석", href: "/intevity" },
            { label: "감사", href: "/audit" },
            { label: "집값", href: "/hvi" },
            { label: "상담", href: "/chat" },
            { label: "이용약관", href: "#" },
            { label: "개인정보", href: "#" },
          ].map((l) => (
            <Link key={l.label} href={l.href} className="text-[10px] text-[#1A1A1A]/15 transition-colors duration-500 hover:text-[#1A1A1A]/40">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

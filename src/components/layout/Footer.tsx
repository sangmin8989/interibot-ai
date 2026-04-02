import Link from "next/link";

const serviceLinks = [
  { label: "성향분석", href: "/intevity" },
  { label: "견적서 감사", href: "/audit" },
  { label: "집값 분석", href: "/hvi" },
  { label: "AI 상담", href: "/chat" },
];

const companyLinks = [
  { label: "이용약관", href: "#" },
  { label: "개인정보처리방침", href: "#" },
  { label: "문의하기", href: "mailto:contact@argen.studio" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Logo / info */}
          <div>
            <p className="text-xl font-bold">
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                인테리봇
              </span>{" "}
              <span className="text-white">AI</span>
            </p>
            <p className="mt-3 text-sm text-gray-500">아르젠 스튜디오</p>
            <p className="mt-1 text-sm text-gray-600">
              인테리어, 전문가 없이도 똑똑하게
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                서비스
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {serviceLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm text-gray-500 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                회사
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {companyLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-sm text-gray-500 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6">
          <p className="text-center text-xs text-gray-600">
            &copy; 2026 아르젠 스튜디오. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

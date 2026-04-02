import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-semibold">아르젠 스튜디오</p>
            <p className="text-sm text-muted-foreground">
              인테리어, 전문가 없이도 똑똑하게
            </p>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              이용약관
            </Link>
            <Link href="#" className="hover:text-foreground">
              개인정보처리방침
            </Link>
            <Link href="mailto:contact@argen.studio" className="hover:text-foreground">
              문의하기
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} 아르젠 스튜디오. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

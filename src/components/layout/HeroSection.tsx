import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-20 text-center md:py-32">
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        인테리어,{" "}
        <span className="text-orange">전문가 없이도</span>{" "}
        똑똑하게
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        12만건 시장 데이터와 AI가 당신의 인테리어 견적을 분석하고,
        성향에 맞는 스타일을 추천합니다.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/intevity">
          <Button size="lg" className="bg-orange text-orange-foreground hover:bg-orange/90">
            성향분석 시작
          </Button>
        </Link>
        <Link href="/audit">
          <Button size="lg" variant="outline">
            견적서 분석
          </Button>
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, BarChart3, MessageCircle, Sparkles } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "성향분석",
    description: "15가지 질문으로 나만의 인테리어 성향을 분석하고, 맞춤 스타일을 추천받으세요.",
    href: "/intevity",
    cta: "분석 시작",
  },
  {
    icon: ClipboardCheck,
    title: "견적서 감사",
    description: "받은 견적서를 업로드하면 시장 데이터 기준으로 항목별 적정가를 비교합니다.",
    href: "/audit",
    cta: "견적서 분석",
  },
  {
    icon: BarChart3,
    title: "집값 분석",
    description: "리모델링 후 예상 집값 상승과 공정별 투자 수익률을 확인하세요.",
    href: "/hvi",
    cta: "분석 보기",
  },
  {
    icon: MessageCircle,
    title: "AI 상담",
    description: "인테리어 전반에 대한 궁금한 점을 AI 전문가에게 자유롭게 질문하세요.",
    href: "/chat",
    cta: "상담 시작",
  },
];

export default function FeatureCards() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f) => (
        <Card key={f.href} className="flex flex-col">
          <CardHeader>
            <f.icon className="mb-2 h-8 w-8 text-orange" />
            <CardTitle>{f.title}</CardTitle>
            <CardDescription>{f.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Link href={f.href} className="w-full">
              <Button variant="outline" className="w-full">
                {f.cta}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}

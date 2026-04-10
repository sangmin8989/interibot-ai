import { INTEVITY_TYPES, INTEVITY_TYPE_MAP } from "@/lib/intevity/types";
import { HABITS } from "@/lib/intevity/habits";
import { PLOT_TWISTS } from "@/lib/intevity/plotTwists";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ typeId: string }>;
}

export async function generateStaticParams() {
  return INTEVITY_TYPES.map((t) => ({ typeId: t.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { typeId } = await params;
  const type = INTEVITY_TYPE_MAP[typeId];
  if (!type) return {};

  return {
    title: `${type.archetype} | 인테비티 성향 테스트`,
    description: type.oneLiner,
    openGraph: {
      title: `나는 "${type.archetype}" 유형이에요`,
      description: type.oneLiner,
    },
  };
}

export default async function ResultPage({ params }: PageProps) {
  const { typeId } = await params;
  const type = INTEVITY_TYPE_MAP[typeId];
  if (!type) notFound();

  const habits = HABITS[typeId] ?? [];
  const plotTwist = PLOT_TWISTS[typeId] ?? "";

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{ backgroundColor: type.sigColor }}
      >
        <span className="text-6xl mb-4">{type.emoji}</span>
        <h1
          className="text-3xl font-black mb-2"
          style={{ color: "#C6A376" }}
        >
          {type.archetype}
        </h1>
        <p
          className="text-base opacity-80 max-w-sm"
          style={{ color: isLight(type.sigColor) ? "#333" : "#fff" }}
        >
          {type.oneLiner}
        </p>
      </section>

      {/* Habits */}
      {habits.length > 0 && (
        <section className="max-w-md mx-auto px-6 py-12">
          <h2 className="text-lg font-bold mb-4 text-gray-900">
            이런 사람이라면, 당신은 {type.name}
          </h2>
          <ul className="space-y-3">
            {habits.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="shrink-0">&#x2022;</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Plot Twist */}
      {plotTwist && (
        <section className="max-w-md mx-auto px-6 pb-12">
          <h2 className="text-lg font-bold mb-4 text-gray-900">
            반전 매력
          </h2>
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {plotTwist}
          </p>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-md mx-auto px-6 pb-20 text-center">
        <Link
          href="/intevity"
          className="inline-block bg-black text-white text-sm font-semibold px-8 py-3 hover:bg-gray-800 transition-colors"
        >
          나도 내 인테리어 유형 알아보기 &rarr;
        </Link>
      </section>
    </main>
  );
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

import { NextRequest, NextResponse } from "next/server";
import { ExtractedQuoteSchema } from "@/lib/schema/quote";
import { generateAuditReport } from "@/lib/engine/audit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quote, areaPy } = body;

    const validatedQuote = ExtractedQuoteSchema.parse(quote);

    if (!areaPy || areaPy <= 0) {
      return NextResponse.json(
        { error: "평수 정보가 필요합니다." },
        { status: 400 }
      );
    }

    const report = await generateAuditReport(validatedQuote, areaPy);

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "감사 분석 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

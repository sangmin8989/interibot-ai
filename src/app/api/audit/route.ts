import { NextRequest, NextResponse } from "next/server";
import { ExtractedQuoteSchema } from "@/lib/schema/quote";
import { generateAnalysisReport } from "@/lib/engine/audit";
import { validateAndCorrectQuote } from "@/lib/engine/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quote, areaPy } = body;

    console.log("[audit] Received quote:", JSON.stringify(quote).slice(0, 300));
    console.log("[audit] areaPy:", areaPy);

    const parsedQuote = ExtractedQuoteSchema.parse(quote);

    // 평수 fallback: 사용자 입력 → 견적서 추출값 → 기본값 32평
    const rawArea = typeof areaPy === "number" && Number.isFinite(areaPy) && areaPy > 0 && areaPy <= 200 ? areaPy : null;
    const effectiveAreaPy = rawArea ?? (parsedQuote.area && parsedQuote.area > 0 && parsedQuote.area <= 200 ? parsedQuote.area : 32);

    // 검증 + 공정명 정규화 + 단위 보정
    const validation = validateAndCorrectQuote(parsedQuote, effectiveAreaPy);
    console.log("[audit] Validation result:", { isValid: validation.isValid, score: validation.score, errors: validation.errors, warnings: validation.warnings, corrections: validation.corrections });

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(", "), warnings: validation.warnings },
        { status: 400 }
      );
    }

    // 보정된 quote로 분석 실행
    const report = await generateAnalysisReport(validation.correctedQuote, effectiveAreaPy);

    return NextResponse.json({
      report,
      corrections: validation.corrections,
      validationWarnings: validation.warnings,
    });
  } catch (error) {
    console.error("Audit API error:", error);
    const msg = error instanceof Error ? error.message : "";
    // Zod 에러 등 개발자 메시지를 사용자 메시지로 변환
    const userMsg = msg.includes("Zod") || msg.includes("parse") || msg.includes("schema")
      ? "견적서 데이터 형식이 올바르지 않습니다. 다른 파일로 다시 시도해 주세요."
      : msg || "분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
    return NextResponse.json({ error: userMsg }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { extractQuoteFromImage, extractQuoteFromText, extractQuoteFromExcel, extractFloorplanData } from "@/lib/gemini/ocr";
import { saveUploadedDocument } from "@/lib/supabase/queries";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const estimateFile = formData.get("estimate") as File | null;
    const floorplanFile = formData.get("floorplan") as File | null;
    const apartmentName = formData.get("apartmentName") as string | null;
    const areaPy = formData.get("areaPy") as string | null;
    const region = formData.get("region") as string | null;

    if (!estimateFile) {
      return NextResponse.json(
        { error: "견적서 파일이 필요합니다." },
        { status: 400 }
      );
    }

    // 파일 타입별 분기 처리
    let extractedQuote;
    const fileType = estimateFile.type;

    if (fileType === "image/jpeg" || fileType === "image/png") {
      const buffer = await estimateFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      extractedQuote = await extractQuoteFromImage(base64, fileType);
    } else if (fileType === "application/pdf") {
      // PDF → 텍스트 추출 후 Gemini 분석
      const pdfParseModule = await import("pdf-parse");
      const pdfParse = (pdfParseModule as { default?: typeof pdfParseModule }).default || pdfParseModule;
      const buffer = Buffer.from(await estimateFile.arrayBuffer());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfData = await (pdfParse as any)(buffer);
      extractedQuote = await extractQuoteFromText(pdfData.text);
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      // XLSX → SheetJS 파싱 후 Gemini 분석
      const XLSX = await import("xlsx");
      const buffer = Buffer.from(await estimateFile.arrayBuffer());
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(firstSheet) as Record<string, unknown>[];
      extractedQuote = await extractQuoteFromExcel(rows);
    } else {
      return NextResponse.json(
        { error: "지원하지 않는 파일 형식입니다. (JPG, PNG, PDF, XLSX)" },
        { status: 400 }
      );
    }

    // 도면 분석 (있으면)
    let floorplanData = null;
    if (floorplanFile) {
      const floorplanType = floorplanFile.type;
      if (floorplanType === "image/jpeg" || floorplanType === "image/png") {
        const buffer = await floorplanFile.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        floorplanData = await extractFloorplanData(base64, floorplanType);
      }
    }

    // DB 저장
    try {
      await saveUploadedDocument({
        session_id: crypto.randomUUID(),
        document_type: "estimate",
        file_name: estimateFile.name,
        file_size: estimateFile.size,
        extracted_data: extractedQuote as unknown as Record<string, unknown>,
        apartment_name: apartmentName || extractedQuote.apartmentName,
        area_py: areaPy ? Number(areaPy) : extractedQuote.area,
        region: region || undefined,
      });
    } catch {
      // DB 저장 실패해도 분석 결과는 반환
      console.error("DB 저장 실패 — 분석 결과는 정상 반환");
    }

    return NextResponse.json({
      quote: extractedQuote,
      floorplan: floorplanData,
      apartmentName: apartmentName || extractedQuote.apartmentName,
      areaPy: areaPy ? Number(areaPy) : extractedQuote.area,
      region,
    });
  } catch (error) {
    console.error("Upload processing error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "파일 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

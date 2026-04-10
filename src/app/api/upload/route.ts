import { NextRequest, NextResponse } from "next/server";
import { extractQuoteFromImage, extractQuoteFromPdf, extractQuoteFromText, extractQuoteFromExcel, extractFloorplanData } from "@/lib/gemini/ocr";
import { saveUploadedDocument } from "@/lib/supabase/queries";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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

    if (estimateFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "파일 크기가 10MB를 초과합니다." },
        { status: 400 }
      );
    }

    if (floorplanFile && floorplanFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "도면 파일 크기가 10MB를 초과합니다." },
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
      // PDF → Gemini에 직접 전송
      const buffer = await estimateFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      extractedQuote = await extractQuoteFromPdf(base64);
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
      if (rows.length === 0) {
        return NextResponse.json({ error: "엑셀 파일이 비어있습니다." }, { status: 400 });
      }
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

    // areaPy 숫자 변환 (NaN 방어)
    const parsedAreaPy = areaPy ? parseInt(areaPy, 10) : null;
    const finalAreaPy = parsedAreaPy && !Number.isNaN(parsedAreaPy) ? parsedAreaPy : extractedQuote.area;

    // DB 저장
    let dbSaved = true;
    try {
      await saveUploadedDocument({
        session_id: crypto.randomUUID(),
        document_type: "estimate",
        file_name: estimateFile.name,
        file_size: estimateFile.size,
        extracted_data: extractedQuote as unknown as Record<string, unknown>,
        apartment_name: apartmentName || extractedQuote.apartmentName,
        area_py: finalAreaPy,
        region: region || undefined,
      });
    } catch (dbError) {
      dbSaved = false;
      console.error("DB 저장 실패:", dbError);
    }

    return NextResponse.json({
      quote: extractedQuote,
      floorplan: floorplanData,
      apartmentName: apartmentName || extractedQuote.apartmentName,
      areaPy: finalAreaPy,
      region,
      ...(dbSaved ? {} : { warning: "분석은 완료되었으나 서버 저장에 실패했습니다." }),
    });
  } catch (error) {
    console.error("Upload processing error:", error);
    const msg = error instanceof Error ? error.message : "";
    const userMsg =
      msg.includes("JSON") ? "견적서를 인식하지 못했습니다. 다른 파일로 다시 시도해 주세요." :
      msg.includes("API") || msg.includes("fetch") ? "AI 서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요." :
      msg || "파일 처리 중 오류가 발생했습니다.";
    return NextResponse.json({ error: userMsg }, { status: 500 });
  }
}

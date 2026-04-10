import { NextRequest, NextResponse } from "next/server";
import { getMarketContext } from "@/lib/supabase/queries";

export async function POST(request: NextRequest) {
  try {
    const { pyeong, region } = await request.json();

    if (!pyeong || typeof pyeong !== "number") {
      return NextResponse.json({ error: "평형(pyeong)이 필요합니다." }, { status: 400 });
    }

    const context = await getMarketContext(pyeong, region);
    return NextResponse.json(context);
  } catch (error) {
    console.error("Market context error:", error);
    return NextResponse.json(
      { error: "시장 데이터 조회 실패" },
      { status: 500 },
    );
  }
}

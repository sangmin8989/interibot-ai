import { ImageResponse } from "next/og";
import { INTEVITY_TYPE_MAP } from "@/lib/intevity/types";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ typeId: string }>;
}) {
  const { typeId } = await params;
  const type = INTEVITY_TYPE_MAP[typeId];

  if (!type) {
    return new ImageResponse(<div>Not Found</div>, { ...size });
  }

  const light = isLight(type.sigColor);
  const textColor = light ? "#333" : "#fff";

  return new ImageResponse(
    (
      <div
        style={{
          background: type.sigColor,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64 }}>{type.emoji}</div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#C6A376",
            marginTop: 16,
          }}
        >
          {type.archetype}
        </div>
        <div
          style={{
            fontSize: 22,
            opacity: 0.8,
            color: textColor,
            marginTop: 8,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {type.oneLiner}
        </div>
        <div
          style={{
            fontSize: 14,
            opacity: 0.5,
            color: textColor,
            marginTop: 24,
          }}
        >
          인테비티 성향 테스트 | interibot-ai.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

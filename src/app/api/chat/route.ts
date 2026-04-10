import { streamText } from "ai";
import { geminiFlash } from "@/lib/gemini/client";
import { SYSTEM_PROMPT } from "@/lib/prompts/system";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "잘못된 요청 형식입니다." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages } = body as { messages?: unknown };

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "메시지가 필요합니다." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // UIMessage (parts 형식) → ModelMessage (content 형식) 변환
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const converted = messages.map((m: any) => {
    if (m.content) return m;
    // parts 형식 → content 문자열 변환
    const text = m.parts
      ?.filter((p: { type: string }) => p.type === "text")
      .map((p: { text: string }) => p.text)
      .join("\n") || "";
    return { role: m.role, content: text };
  });

  const result = streamText({
    model: geminiFlash,
    system: SYSTEM_PROMPT,
    messages: converted,
  });

  return result.toTextStreamResponse();
}

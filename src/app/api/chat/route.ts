import { streamText } from "ai";
import { geminiFlash } from "@/lib/gemini/client";
import { SYSTEM_PROMPT } from "@/lib/prompts/system";

export async function POST(request: Request) {
  const { messages } = await request.json();

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

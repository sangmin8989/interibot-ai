import type { UIMessage } from "ai";

/* Hermès: messages laid out like correspondence on fine paper */

export default function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = message.parts?.filter((p): p is { type: "text"; text: string } => p.type === "text").map((p) => p.text).join("\n") || "";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <p className="max-w-[70%] text-right text-[14px] leading-[1.8] text-[#1A1A1A]/60">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] border-l border-[#FF6B35]/20 pl-5">
        {text.split("\n").map((line, i) => (
          <p key={i} className={`text-[14px] leading-[1.8] text-[#1A1A1A] ${line === "" ? "h-3" : ""}`}>
            {line}
          </p>
        ))}
        <p className="mt-3 text-[9px] text-[#1A1A1A]/15">시장 데이터 기반</p>
      </div>
    </div>
  );
}

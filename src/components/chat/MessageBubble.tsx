import type { UIMessage } from "ai";

export default function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  const textContent =
    message.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("\n") || "";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-[#F3F4F6] text-[#1A1A1A]"
            : "rounded-bl-sm border-l-2 border-[#FF6B35] bg-white text-[#374151] shadow-sm"
        }`}
      >
        {textContent.split("\n").map((line, i) => (
          <p key={i} className={line === "" ? "h-2" : "my-0.5"}>
            {line}
          </p>
        ))}
        {!isUser && (
          <p className="mt-2 text-[10px] text-[#9CA3AF]">📊 시장 9,610건 데이터 기반</p>
        )}
      </div>
    </div>
  );
}

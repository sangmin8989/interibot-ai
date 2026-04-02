import type { UIMessage } from "ai";

export default function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  // Extract text content from parts
  const textContent = message.parts
    ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("\n") || "";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-orange text-orange-foreground"
            : "bg-muted text-foreground"
        }`}
      >
        {textContent.split("\n").map((line, i) => (
          <p key={i} className={line === "" ? "h-2" : "my-1"}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

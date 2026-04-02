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
            ? "rounded-br-md bg-gradient-to-r from-orange-500 to-amber-500 text-white"
            : "rounded-bl-md bg-gray-100 text-gray-800"
        }`}
      >
        {textContent.split("\n").map((line, i) => (
          <p key={i} className={line === "" ? "h-2" : "my-0.5"}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

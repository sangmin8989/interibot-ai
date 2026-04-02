"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowUp } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { SUGGESTED_QUESTIONS } from "@/lib/prompts/chat";

/* Hermès: conversation as art. Every message earns its space. */

export default function ChatUI() {
  const transport = useMemo(() => new TextStreamChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = (text: string) => {
    if (!text.trim() || isLoading) return;
    sendMessage({ role: "user", parts: [{ type: "text", text }] });
    setInput("");
  };

  return (
    <div className="flex h-screen flex-col bg-white pt-14">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="font-serif text-2xl font-light text-[#1A1A1A]/20">물어보세요.</p>
            <div className="mt-10 grid max-w-sm grid-cols-2 gap-3">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="border border-[#1A1A1A]/[0.04] bg-white px-4 py-3.5 text-left text-[12px] text-[#1A1A1A]/40 transition-all duration-500 hover:border-[#1A1A1A]/[0.08] hover:text-[#1A1A1A]/60"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-xl space-y-6">
            {messages.map((m) => <MessageBubble key={m.id} message={m} />)}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <span className="text-[12px] text-[#1A1A1A]/20">...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t border-[#1A1A1A]/[0.04] bg-white px-6 py-5">
        <div className="mx-auto flex max-w-xl items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="질문을 입력하세요"
            rows={1}
            className="max-h-32 flex-1 resize-none border-b border-[#1A1A1A]/[0.06] bg-transparent pb-2 text-[14px] text-[#1A1A1A] outline-none transition-colors focus:border-[#1A1A1A]/20"
            disabled={isLoading}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || isLoading}
            className="pb-2 text-[#1A1A1A]/20 transition-colors hover:text-[#1A1A1A] disabled:text-[#1A1A1A]/5"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowUp } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { SUGGESTED_QUESTIONS } from "@/lib/prompts/chat";

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
    <div className="flex h-screen flex-col bg-[#FAFAF9] pt-14">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="font-mono text-6xl font-black text-neutral-100">AI</p>
            <p className="mt-4 text-sm text-neutral-400">무엇이든 물어보세요.</p>
            <div className="mt-8 grid max-w-md grid-cols-2 gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left text-xs text-neutral-500 transition-all hover:border-[#FF6B35]/30 hover:shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-4">
            {messages.map((m) => <MessageBubble key={m.id} message={m} />)}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-2xl border-l-2 border-[#FF6B35] bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-300" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-300 [animation-delay:0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-300 [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200 bg-white p-4">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="질문을 입력하세요"
            rows={1}
            className="max-h-32 flex-1 resize-none rounded-2xl border border-neutral-200 bg-[#FAFAF9] px-4 py-3 text-sm transition focus:border-[#FF6B35] focus:bg-white focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35] text-white transition disabled:opacity-20"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

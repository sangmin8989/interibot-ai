"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useRef, useEffect, useState, useMemo } from "react";
import { Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { SUGGESTED_QUESTIONS } from "@/lib/prompts/chat";

export default function ChatUI() {
  const transport = useMemo(() => new TextStreamChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ role: "user", parts: [{ type: "text", text: input }] });
    setInput("");
  };

  const handleSuggestion = (q: string) => {
    sendMessage({ role: "user", parts: [{ type: "text", text: q }] });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-white pt-16">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-8">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B35] to-amber-500 shadow-lg shadow-[#FF6B35]/20">
                <span className="text-xl text-white">AI</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A]">인테리봇 AI 상담</h2>
              <p className="mt-2 text-[#6B7280]">무엇이든 물어보세요</p>
            </div>
            <div className="grid max-w-lg grid-cols-2 gap-2 sm:grid-cols-3">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestion(q)}
                  className="rounded-xl border border-black/[0.06] px-3 py-3 text-left text-xs text-[#6B7280] transition-all hover:border-[#FF6B35]/30 hover:bg-[#FF6B35]/5 hover:text-[#FF6B35]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border-l-2 border-[#FF6B35] bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#9CA3AF]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t border-black/[0.06] bg-white p-4">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl items-end gap-3">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
              }}
              placeholder="인테리어에 대해 무엇이든 물어보세요..."
              rows={1}
              className="max-h-32 w-full resize-none rounded-2xl border border-black/[0.06] bg-[#FAFAF9] px-5 py-3 text-sm transition focus:border-[#FF6B35] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/10"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35] text-white transition hover:bg-[#E85D2C] disabled:opacity-30"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

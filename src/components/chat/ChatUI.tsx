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
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500">
                <span className="text-2xl text-white">💬</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">인테리봇 AI 상담</h2>
              <p className="mt-2 text-gray-500">
                인테리어에 대한 궁금한 점을 자유롭게 질문하세요
              </p>
            </div>
            <div className="flex max-w-lg flex-wrap justify-center gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestion(q)}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
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
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t bg-white p-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl items-center gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="인테리어에 대해 무엇이든 물어보세요..."
            className="flex-1 rounded-2xl border border-gray-200 px-5 py-3 text-sm transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white transition hover:scale-105 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

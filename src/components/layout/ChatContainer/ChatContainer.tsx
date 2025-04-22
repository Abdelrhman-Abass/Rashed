"use client";

import { useChatStore } from "@/store/chatStore";
import { useEffect, useRef } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";

export default function ChatContainer() {
  const { messages } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-zinc-900 ">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      {/* Scroll to bottom reference */}
      <div ref={messagesEndRef} />
    </div>
  );
}

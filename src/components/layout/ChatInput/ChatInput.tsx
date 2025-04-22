"use client";

import { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { useMutation } from "@tanstack/react-query";

async function sendMessageToAPI(content: string): Promise<string> {
  // Simulate API call (replace with real API)
  return new Promise((resolve) =>
    setTimeout(() => resolve("This is a bot response!"), 1000)
  );
}

export default function ChatInput() {
  const [input, setInput] = useState("");
  const { addMessage } = useChatStore();

  const mutation = useMutation({
    mutationFn: sendMessageToAPI,
    onSuccess: (response) => {
      addMessage(response, "bot");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage(input, "user");
    mutation.mutate(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-zinc-900 border-t border-zinc-700 flex items-center gap-x-3"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="ml-3 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {mutation.isPending ? (
          <span className="animate-pulse">Sending...</span>
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
}

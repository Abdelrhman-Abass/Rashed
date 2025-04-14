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
      className="p-4 bg-gray-100 border-t border-gray-300 flex items-center"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {mutation.isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
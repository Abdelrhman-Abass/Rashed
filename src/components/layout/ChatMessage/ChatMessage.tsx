import { Message } from "@/types/Types";

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 px-4`}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <p>{message.content}</p>
        <span className="text-xs opacity-70 block mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
"use client";

import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";


// Input Form Component
const ChatInput = ({
  value,
  onChange,
  onSubmit,
  onFileChange,
  isSending,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSending: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaWidth, setTextareaWidth] = useState("auto");

  // Dynamically adjust textarea width and height
  useEffect(() => {
    if (textareaRef.current) {
      // Adjust width
      const mirror = document.createElement("span");
      mirror.style.visibility = "hidden";
      mirror.style.position = "absolute";
      mirror.style.whiteSpace = "pre";
      mirror.style.font = getComputedStyle(textareaRef.current).font;
      mirror.style.padding = getComputedStyle(textareaRef.current).padding;
      mirror.textContent = value || textareaRef.current.placeholder;

      document.body.appendChild(mirror);
      const width = Math.min(Math.max(mirror.offsetWidth + 20, 150), 800); // Min 150px, Max 800px
      setTextareaWidth(`${width}px`);
      document.body.removeChild(mirror);

      // Adjust height
      textareaRef.current.style.height = "1.5em";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  // Handle Enter key to submit (without Shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as any); // Cast to satisfy TypeScript
    }
  };


  return (
    <div className="sticky bottom-0  border-t ">
      <div className="max-w-4xl mx-auto p-4">
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 w-full border border-gray-600 rounded-2xl  px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent  bg-[#2e3033]"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
            accept="*"
          />
          {/* <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1 text-gray-400 hover:text-gray-300"
            aria-label="Upload file"
            disabled={isSending}
          >
            <Paperclip className="h-5 w-5" />
          </button> */}
          
          <button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            title="Upload file"
            aria-label="Upload file"
            disabled={isSending}
            className="group cursor-pointer outline-none hover:rotate-90 duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35px"
              height="35px"
              viewBox="0 0 24 24"
              className="stroke-purple-400 fill-none group-hover:fill-purple-800 group-active:stroke-purple-200 group-active:fill-purple-600 group-active:duration-0 duration-300"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke-width="1.5"
              ></path>
              <path d="M8 12H16" stroke-width="1.5"></path>
              <path d="M12 16V8" stroke-width="1.5"></path>
            </svg>
          </button>


          {/* <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 py-1 px-2 bg-transparent focus:outline-none text-white"
            disabled={isSending}
          /> */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 py-1 px-2 bg-transparent focus:outline-none text-white resize-none min-w-0 text-sm"
            style={{ width: textareaWidth, minHeight: "1.5em", maxHeight: "150px", overflowY: "auto" }}
            disabled={isSending}
          />
          
          <button
            type="submit"
            disabled={!value.trim() || isSending}
            className={`p-1 rounded-full ${!value.trim() || isSending
              ? "text-gray-400"
              : "text-indigo-500 hover:text-indigo-600"
              }`}
            aria-label="Send message"
          >
            {isSending ? (
              <div className="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
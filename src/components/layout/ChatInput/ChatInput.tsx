"use client";

import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ChatInput = ({
  value,
  onChange,
  onSubmit,
  isSending,
  start,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSending: boolean;
  start: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaWidth, setTextareaWidth] = useState("auto");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      const mirror = document.createElement("span");
      mirror.style.visibility = "hidden";
      mirror.style.position = "absolute";
      mirror.style.whiteSpace = "pre";
      mirror.style.font = getComputedStyle(textareaRef.current).font;
      mirror.style.padding = getComputedStyle(textareaRef.current).padding;
      mirror.textContent = value || textareaRef.current.placeholder;

      document.body.appendChild(mirror);
      const width = Math.min(Math.max(mirror.offsetWidth + 20, 150), 800);
      setTextareaWidth(`${width}px`);
      document.body.removeChild(mirror);

      textareaRef.current.style.height = "1.5em";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as any);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    }
  };

  return (
    <div className={`sticky bottom-0 ${!start && "border-t"}`}>
      <div className="max-w-4xl mx-auto px-8 pb-4">
        <form
          onSubmit={onSubmit}
          className={`relative flex items-end gap-2 w-full ${
            !start && "border border-gray-600"
          } rounded-2xl px-8 py-4 bg-[#2e3033] focus-within:ring-2 focus-within:ring-indigo-500`}
        >
          {/* PDF Preview Above + Button */}
          {pdfFile && (
            <div className="absolute bottom-[100%] left-2 mb-1 flex items-center gap-2 bg-[#2e3033] text-gray-300 px-3 py-2 rounded-lg shadow-md z-10 max-w-xs transition-all duration-200 hover:shadow-lg">
              {/* PDF Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-indigo-500"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 3A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h10.5A2.25 2.25 0 0019.5 18.75V9.62a2.25 2.25 0 00-.659-1.591l-4.87-4.87A2.25 2.25 0 0012.38 3H6.75zM12 9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 9zM9 12.75a.75.75 0 01.75.75v.75H9a.75.75 0 010-1.5zm6.75 0a.75.75 0 00-1.5 0v.75h1.5v-.75z"
                  clipRule="evenodd"
                />
              </svg>

              {/* File Name */}
              <span className="truncate text-sm font-medium max-w-[150px]">
                {pdfFile.name}
              </span>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => {
                  setPdfFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="group p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-colors shadow-sm"
                aria-label="Remove PDF"
              >
                <X className="w-2 h-2 group-hover:scale-110 transition-transform " />
              </button>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="application/pdf"
          />

          {/* + Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Upload PDF"
            aria-label="Upload PDF"
            disabled={isSending}
            className="group outline-none duration-300 hover:rotate-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
              className="stroke-purple-400 fill-none group-hover:fill-purple-800 group-active:stroke-purple-200 group-active:fill-purple-600 group-active:duration-0 duration-300"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                strokeWidth="1.5"
              ></path>
              <path d="M8 12H16" strokeWidth="1.5"></path>
              <path d="M12 16V8" strokeWidth="1.5"></path>
            </svg>
          </button>

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 py-1 px-2 bg-transparent focus:outline-none text-white resize-none min-w-0 text-sm"
            style={{
              width: textareaWidth,
              minHeight: "1.5em",
              maxHeight: "150px",
              overflowY: "auto",
            }}
            disabled={isSending}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!value.trim() || isSending}
            className={`p-1 rounded-full ${
              !value.trim() || isSending
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

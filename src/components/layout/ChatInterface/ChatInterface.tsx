
"use client";

import { useChatStoreContent } from "@/store/chatStore";
import { Paperclip, Send, ChevronDown, Download } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function ChatInterface() {
  const { messages, input, setInput, sendMessage, uploadFile } = useChatStoreContent();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      // Add user message immediately
      const userMessage = {
        id: Date.now().toString(),
        content: input,
        role: "user" as const,
      };
      
      // You'll need to modify your store to handle temporary messages
      // For now, we'll assume sendMessage handles this
      await sendMessage();
      
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const downloadAsPDF = async (messageId: string) => {
    const messageElement = messageRefs.current[messageId];
    if (!messageElement) return;

    try {
      const canvas = await html2canvas(messageElement, {
        backgroundColor: null,
        scale: 2
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm"
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`chat-response-${messageId.slice(0, 5)}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]); // Also scroll when loading state changes

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) > 100;
      setShowScrollButton(isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            ChatApp
          </h1>
        </div>
      </header>

      {/* Main chat area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto relative"
      >
        <div className="max-w-3xl mx-auto p-4 relative">
          {messages.length === 0 && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center min-h-[60vh]">
              <div className="max-w-md space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Welcome to ChatApp
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Start a conversation by typing a message below
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    ref={(el) => {
                      if (el) {
                        messageRefs.current[message.id] = el;
                      } else {
                        delete messageRefs.current[message.id];
                      }
                    }}
                    className={`relative max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === "user"
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 pb-8"
                    } ${index < messages.length - 1 ? "mb-2" : ""}`}
                  >
                    {message.content}
                    
                    {message.role !== "user" && (
                      <button
                        onClick={() => downloadAsPDF(message.id)}
                        className="absolute right-2 bottom-2 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                        title="Download as PDF"
                      >
                        <Download className="h-3 w-3" />
                        <span>PDF</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading indicator for assistant response */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="relative max-w-[80%] rounded-lg px-4 py-3 bg-gray-200 dark:bg-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Scroll to bottom button */}
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="fixed right-9 md:right-12 md:bottom-30 bottom-24 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Scroll to bottom"
            >
              <ChevronDown className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto p-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 w-full border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-gray-50 dark:bg-gray-800"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="*"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Upload file"
              disabled={isLoading}
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-1 px-2 bg-transparent focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-1 rounded-full ${
                !input.trim() || isLoading 
                  ? 'text-gray-400' 
                  : 'text-blue-500 hover:text-blue-600'
              }`}
              aria-label="Send message"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
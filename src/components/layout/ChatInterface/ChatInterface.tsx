"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Paperclip, Send, ChevronDown, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { useAuthStore } from "@/store/authStore";
import { getServerRequest, postServerRequest, postFileServerRequest } from "@/utils/generalServerRequest";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageBubble from "../MessageBubble/MessageBubble";
import { Message } from "@/types/Types";
import ChatInput from "../ChatInput/ChatInput";
import Loader from "@/components/common/Loader";

// Main Chat Interface Component
export default function ChatInterface() {
  const [newMessage, setNewMessage] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const router = useRouter();
  const { id: sessionId } = useParams();
  const { token, logout } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if(!token) {
      router.push("/auth/login");
    }
  }, [router, sessionId, token]); // Log sessionId and token changes

  // Fetch messages
  const { data: messagesResponse, refetch: fetchMessages, isLoading, error, status } = useQuery({
    queryKey: ["messages", sessionId],
    queryFn: async () => {
      const response = await getServerRequest(`/messages/get-message/${sessionId}`);
      return response;
    },
    enabled: !!sessionId && !!token,
    select: (response) => {
      // Check for nested data.data structure
      const nestedData = response.success && response.data && response.data.success && Array.isArray(response.data.data)
        ? response.data.data
        : [];
      return nestedData;
    },
    staleTime: 600000, // Prevent refetching for 1 minute unless invalidated
  });

  // Process messages with useMemo
  const messages = useMemo(() => {
    const msgArray = Array.isArray(messagesResponse) ? messagesResponse : [];
    console.log("useMemo - Processed Messages:", msgArray);
    return msgArray;
  }, [messagesResponse]);

  // Send a message
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: (content: string) =>
      postServerRequest(`/messages/send-message/${sessionId}`, { content }),
    onSuccess: (response) => {
      if (response.success) {
        fetchMessages(); // Force refetch messages after sending
        setNewMessage(""); // Clear input on success
        // Invalidate conversations query to update sidebar
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      } else {
        showErrorToast(response.message || "Failed to send message.");
      }
    },
    onError: (error: any) => {
      showErrorToast("An error occurred while sending the message: " + (error.message || "Unknown error"));
    },
  });

  // Handle form submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !sessionId) return;
    sendMessage(newMessage);
  };

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const response = await postFileServerRequest(`/upload/${sessionId}`, file);
      if (response.success) {
        showSuccessToast(`File ${file.name} uploaded.`);
        sendMessage(`Uploaded file: ${response.data.url || file.name}`);
      } else {
        showErrorToast(response.message || "Failed to upload file.");
      }
    }
  };

  // Handle PDF download
  const downloadAsPDF = async (messageId: string) => {
    const messageElement = messageRefs.current[messageId];
    if (!messageElement) return;

    try {
      const canvas = await html2canvas(messageElement, {
        backgroundColor: null,
        scale: 2,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`chat-response-${messageId.slice(0, 5)}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      showErrorToast("Failed to download message as PDF.");
    }
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, sessionId]); // Refetch when sessionId or token changes


  

  // Handle scroll button visibility
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) > 100;
      setShowScrollButton(isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    showSuccessToast("Logged out successfully!");
    router.push("/login");
  };
  
  // Show loading state while fetching
  if (isLoading || !sessionId) {
    return (
      <div className="flex flex-col h-screen text-white">
        <ChatHeader sessionId={sessionId as string} onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center">
          <Loader  />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen text-white">
      <ChatHeader sessionId={sessionId as string} onLogout={handleLogout} />

      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-3xl font-bold">Hi, I am Rashed</h1>
            <p className="text-gray-400">
            How can I help you today?
            </p>
          </div>
          <div className="w-full max-w-2xl  px-6">
            <ChatInput
              value={newMessage}
              onChange={setNewMessage}
              onSubmit={handleSendMessage}
              onFileChange={handleFileChange}
              isSending={isSending}
              start={true}
            />
          </div>
        </div>
      ) : (
        <>
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto relative p-6"
          >
            <div className="space-y-2 mx-0 md:mx-[15%]">
              {messages.map((message: Message, index: number) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLast={index === messages.length - 1}
                  onDownloadPDF={downloadAsPDF}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="fixed right-8 bottom-24 z-10 p-3 rounded-full bg-indigo-500 shadow-lg hover:bg-indigo-600 transition-colors"
                aria-label="Scroll to bottom"
              >
                <ChevronDown className="h-5 w-5 text-white" />
              </button>
            )}
          </div>

          <ChatInput
            value={newMessage}
            onChange={setNewMessage}
            onSubmit={handleSendMessage}
            onFileChange={handleFileChange}
            isSending={isSending}
            start={false}
          />
        </>
      )}
    </div>
  );
}
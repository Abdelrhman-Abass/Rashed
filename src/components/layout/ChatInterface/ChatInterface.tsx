"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Paperclip, Send, ChevronDown, X } from "lucide-react";
import { jsPDF } from "jspdf";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { useAuthStore } from "@/store/authStore";
import { getServerRequest, postServerRequest, postFileServerRequest } from "@/utils/generalServerRequest";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageBubble from "../MessageBubble/MessageBubble";
import { Message } from "@/types/Types";
import ChatInput from "../ChatInput/ChatInput";
import Loader from "@/components/common/Loader";



export default function ChatInterface() {
  const [newMessage, setNewMessage] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState<string | null>(null); // Modal state for messageId
  const [pdfName, setPdfName] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const router = useRouter();
  const { id: sessionId } = useParams();
  const { token, logout } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch messages
  const { data: messagesResponse, refetch: fetchMessages, isLoading } = useQuery({
    queryKey: ["messages", sessionId],
    queryFn: async () => {
      const response = await getServerRequest(`/messages/get-message/${sessionId}`);
      return response;
    },
    enabled: !!sessionId && !!token,
    select: (response) => {
      const nestedData = response.success && response.data && response.data.success && Array.isArray(response.data.data)
        ? response.data.data
        : [];
      return nestedData;
    },
    staleTime: 600000,
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
        fetchMessages();
        setNewMessage("");
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        queryClient.invalidateQueries({ queryKey: ["chatInfo", sessionId] });

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

  // Handle file upload with PDF text extraction



  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) {
  //     const file = e.target.files[0];
  //     const fileName = file.name.toLowerCase();

  //     if (!fileName.endsWith(".pdf") || file.type !== "application/pdf") {
  //       showErrorToast("Only PDF files are allowed.");
  //       return;
  //     }

  //     try {
  //       // Create FormData to send PDF file
  //       const formData = new FormData();
  //       formData.append("file", file);

  //       // Send to API route
  //       const response = await fetch("/api/pdf-extract", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const result = await response.json();

  //       if (!response.ok || !result.success) {
  //         showErrorToast(result.message || "Failed to extract PDF text.");
  //         return;
  //       }

  //       // Set extracted text and PDF name
  //       setNewMessage(result.data.text);
  //       setPdfName(result.data.filename);
  //       showSuccessToast(`PDF text from ${result.data.filename} loaded into textarea.`);

  //       // Auto-dismiss PDF name box after 5 seconds
  //       setTimeout(() => setPdfName(null), 5000);
  //     } catch (error) {
  //       console.error("Error processing PDF:", error);
  //       showErrorToast("Failed to process PDF upload.");
  //     }
  //   }
  // };

  // Handle PDF download with user choice
  
  const downloadAsPDF = async (messageId: string, includeQuestion: boolean) => {
    const message = messages.find((msg: Message) => msg.id === messageId);
    if (!message) {
      showErrorToast("Message not found.");
      return;
    }

    // Find the preceding user question (if any)
    let userQuestion: string | null = null;
    if (includeQuestion) {
      const messageIndex = messages.findIndex((msg: Message) => msg.id === messageId);
      if (messageIndex > 0 && !messages[messageIndex - 1].isFromBot) {
        userQuestion = messages[messageIndex - 1].content;
      }
    }

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Constants for layout
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      const lineHeight = 6;
      const headerSpace = 10;
      const sectionSpace = 8;

      // Normalize text to handle special characters and format lists
      const normalizeText = (text: string) => {
        // Replace special characters
        const normalized = text
          .replace(/\\n/g, "\n") // Handle newlines
          .replace(/[\b]/g, "") // Remove backspaces
          .replace(/\t/g, "    ") // Replace tabs with spaces
          .replace(/[^\x20-\x7E\n]/g, ""); // Remove non-printable characters

        // Format lists (e.g., "- Item" to proper bullet points)
        const lines = normalized.split("\n");
        const formattedLines = lines.map((line) => {
          if (line.trim().startsWith("-")) {
            return `• ${line.trim().slice(1).trim()}`; // Replace "-" with bullet point
          }
          return line;
        });
        return formattedLines.join("\n");
      };

      // Function to add text with page break handling
      const addTextWithPageBreak = (text: string, x: number, y: number, fontSize: number, style: string) => {
        pdf.setFont("helvetica", style);
        pdf.setFontSize(fontSize);
        const lines = pdf.splitTextToSize(text, maxWidth);
        let currentY = y;

        for (const line of lines) {
          if (currentY + lineHeight > pageHeight - 30) {
            pdf.addPage();
            currentY = margin;
          }
          pdf.text(line, x, currentY);
          currentY += lineHeight;
        }
        return currentY;
      };

      // Header: Logo and Title
      let yPosition = margin;
      const logoWidth = 25;
      const logoHeight = 25;
      const logoX = (pageWidth - logoWidth) / 2;

      try {
        const logoPath = "/assets/transparent_logo.png";
        pdf.addImage(logoPath, "PNG", logoX, yPosition, logoWidth, logoHeight);
      } catch (error) {
        console.warn("Failed to load logo, using placeholder:", error);
        pdf.setFillColor(220, 220, 220);
        pdf.rect(logoX, yPosition, logoWidth, logoHeight, "F");
        pdf.setTextColor(0);
        pdf.setFontSize(10);
        pdf.text("Logo", logoX + logoWidth / 2, yPosition + logoHeight / 2, { align: "center" });
      }




      yPosition += logoHeight + 15;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(21);
      pdf.setTextColor(0, 0, 0); // Black text on white background
      pdf.text("Rashed's Report", pageWidth / 2, yPosition, { align: "center" });

      yPosition += 10;
      pdf.setFontSize(16);
      pdf.text("Chatbot Response Report", pageWidth / 2, yPosition, { align: "center" });

      // Body
      yPosition += 15;

      if (includeQuestion && userQuestion) {
        // Question Section
        yPosition = addTextWithPageBreak("Asked Question", margin, yPosition, 14, "bold");
        yPosition += sectionSpace;

        const normalizedQuestion = normalizeText(userQuestion);
        yPosition = addTextWithPageBreak(normalizedQuestion, margin, yPosition, 12, "normal");
        yPosition += sectionSpace;

        
      }

      // Response Section
      yPosition = addTextWithPageBreak("Bot Response", margin, yPosition, 14, "bold");
      yPosition += sectionSpace;

      const normalizedMessage = normalizeText(message.content);
      yPosition = addTextWithPageBreak(normalizedMessage, margin, yPosition, 12, "normal");

      // Footer
      if (yPosition + 20 > pageHeight - 30) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setDrawColor(0, 0, 0, 0.3);
      pdf.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(
        `Generated by Rashed's Chatbot on ${new Date().toLocaleString("en-US", { timeZone: "Europe/Helsinki" })}`,
        pageWidth / 2,
        pageHeight - 15,
        { align: "center" }
      );

      // Save PDF
      const pdfName = userQuestion ? userQuestion.split(" ").slice(0, 3).join(" ") : "chatbot-report";
      // pdf.save(`${pdfName.replace(/[^a-zA-Z0-9]/g, "_")}-${messageId.slice(0, 5)}.pdf`);
      pdf.save(`Rashed-report ${userQuestion ? userQuestion.split(" ").slice(0, 3).join(" ") : message.content.split("").slice(0, 3)}.pdf`);

      showSuccessToast("Report downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      showErrorToast("Failed to generate PDF report.");
    }
  };


  // Handle PDF prompt
  const handleDownloadPrompt = (messageId: string) => {
    setShowPromptModal(messageId);
  };

  // Handle modal choice
  const handleModalChoice = (includeQuestion: boolean) => {
    if (showPromptModal) {
      downloadAsPDF(showPromptModal, includeQuestion);
    }
    setShowPromptModal(null);
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
  }, [fetchMessages, sessionId]);

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

  if (isLoading || !sessionId) {
    return (
      <div className="flex flex-col h-screen text-white">
        <ChatHeader sessionId={sessionId as string} onLogout={handleLogout} />
        <div className="flex-1 flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen text-white bg-gradient-radial backdrop-blur-xl">
      <ChatHeader sessionId={sessionId as string} onLogout={handleLogout} />
      <ToastContainer />
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-3xl font-bold">Hi, I am Rashed</h1>
            <p className="text-gray-400">How can I help you today?</p>
          </div>
          <div className="w-full max-w-2xl px-6">
            <ChatInput
              value={newMessage}
              onChange={setNewMessage}
              onSubmit={handleSendMessage}
              onFileChange={handleFileChange}
              isSending={isSending}
              start={true}
              sessionId={String(sessionId)}
            />
          </div>
        </div>
      ) : (
        <>
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto relative p-6">
            <div className="space-y-2 mx-0 md:mx-[15%]">
              {messages.map((message: Message, index: number) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLast={index === messages.length - 1}
                  onDownloadPDF={handleDownloadPrompt}
                />
              ))}
              <div ref={messagesEndRef} />
              {showScrollButton && (
                <button
                  onClick={scrollToBottom}
                  className="fixed absolute right-8 md:right-30 bottom-28 z-10 p-2 border-1 rounded-full bg-[#2e3033] shadow-lg  transition-colors"
                  aria-label="Scroll to bottom"
                >
                  <ChevronDown className="h-4 w-4 text-white" />
                </button>
              )}

            </div>


          </div>

          <ChatInput
            value={newMessage}
            onChange={setNewMessage}
            onSubmit={handleSendMessage}
            onFileChange={handleFileChange}
            isSending={isSending}
            start={false}
            sessionId={String(sessionId)}

          />
        </>
      )}

      {/* Modal for PDF prompt with animation */}
      {showPromptModal && (
        <div
          className="fixed inset-0  flex items-center justify-center z-50 animate-in fade-in duration-300"
          onClick={() => setShowPromptModal(null)}
        >
          <div
            className="bg-[#2e3033] p-6 rounded-lg shadow-lg max-w-sm w-full animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">PDF Report Options</h2>
              <button
                onClick={() => setShowPromptModal(null)}
                className="text-gray-400 cursor-pointer hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-300 mb-6">
              Do you want to include the asked question in the PDF report?
            </p>
            <div className="flex justify-evenly ">
              <button
                onClick={() => handleModalChoice(true)}
                className="bg-indigo-500 w-1/3 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => handleModalChoice(false)}
                className="bg-gray-600 w-1/3 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Name Box */}
      {pdfName && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in duration-300">
          <div className="bg-[#2e3033] p-4 rounded-lg shadow-lg flex items-center gap-4 max-w-md w-full">
            <span className="text-white text-sm">PDF Loaded: {pdfName}</span>
            <button
              onClick={() => setPdfName(null)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Close PDF name box"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

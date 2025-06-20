import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getServerRequest } from "../../../utils/generalServerRequest";
import { useAuthStore } from "@/store/authStore";

const ChatHeader = ({
  sessionId,
  onLogout,
}: {
  sessionId: string;
  onLogout: () => void;
}) => {
  const {
    data: chatInfo,
    refetch: fetchChatInfo,
    isLoading: chatInfoLoading,
  } = useQuery({
    queryKey: ["chatInfo", sessionId],
    queryFn: async () => {
      const response = await getServerRequest(
        `/messages/chat-session-info/${sessionId}`
      );
      console.log("chatInfo Response:", response);
      return response;
    },
    enabled: !!sessionId,
  });

  return (
    <header className="sticky top-0 z-10 bg-[#1a1a2e] shadow-sm">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between relative">
        {/* Centered Chat Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%]">
          {chatInfoLoading
            ? "Loading..."
            : `${chatInfo?.data?.data?.title || "New Chat"}`}
        </h1>

        {/* Logout Button - Positioned at the Right End */}
        <button
          onClick={onLogout}
          className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;

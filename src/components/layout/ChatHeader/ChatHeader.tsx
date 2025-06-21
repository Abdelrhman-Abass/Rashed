import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getServerRequest } from "../../../utils/generalServerRequest";
import { useAuthStore } from "@/store/authStore";
import { LogOut } from "lucide-react";

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
          className="group ml-auto flex items-center gap-2 rounded-md cursor-pointer bg-transparent p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden text-sm font-medium group-hover:block">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;

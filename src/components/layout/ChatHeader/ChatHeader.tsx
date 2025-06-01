import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Ensure you have this imported
import { getServerRequest } from '../../../utils/generalServerRequest'; // Adjust the path as needed

const ChatHeader = ({ sessionId, onLogout }: { sessionId: string; onLogout: () => void }) => {
  // Fetch chat session info
  const { data: chatInfo, refetch: fetchChatInfo, isLoading: chatInfoLoading } = useQuery({
    queryKey: ["chatInfo", sessionId],
    queryFn: async () => {
      const response = await getServerRequest(`/messages/chat-session-info/${sessionId}`);
      console.log("chatInfo Response:", response);
      return response;
    },
    enabled: !!sessionId,
    // refetchInterval: 50000, // Uncomment to poll every 50 seconds
  });

  return (
    <header className="sticky top-0 z-10 bg-[#1a1a2e]  shadow-sm">
      <div className="max-w-4xl mx-auto p-4 flex justify-center items-center">
        <h1 className="text-lg font-semibold text-white">
          {chatInfoLoading
            ? "Loading..."
            : `${chatInfo?.data?.data?.title || "Untitled"}`}
        </h1>
        {/* <button
          onClick={onLogout}
          className="bg-red-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-600 transition duration-300"
        >
          Logout
        </button> */}

        
      </div>
    </header>
  );
};

export default ChatHeader;
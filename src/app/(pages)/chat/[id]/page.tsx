"use client";
import ChatInterface from "@/components/layout/ChatInterface/ChatInterface";
// import ChatSidebar from "@/components/layout/SideBar";

// export default function Home() {
  
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <ChatSidebar />
//       <div className="flex-1 flex flex-col md:ml-64">
        
//         <ChatInterface />
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useChatStore } from "@/store/chatStore";
// import ChatContainer from "@/components/layout/ChatContainer/ChatContainer";
// import ChatInput from "@/components/layout/ChatInput/ChatInput";
import Sidebar from "@/components/layout/SideBar";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Home() {
  const { isCollapsed, sidebarOpen, setSidebarOpen } = useChatStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isSidebarTransitioning, setSidebarTransitioning] = useState(false);
  
  // Layout adjustments
  const sidebarWidth = isMobile ? 0 : isCollapsed ? 64 : 256;
  const marginLeft = isMobile ? 0 : sidebarWidth + (isCollapsed ? 14 : 0);

  const handleSidebarToggle = () => {
    setSidebarTransitioning(true); // Begin transition

    // Delay the change of the sidebar state to synchronize transitions
    setTimeout(() => {
      setSidebarOpen(!sidebarOpen);
      setSidebarTransitioning(false); // End transition after a delay
    }, 250); // Adjust this delay according to your preference
  };

  return (
    <div className="relative flex h-screen  transition-all duration-500 ease-in-out">
      <Sidebar />

      <main
        className={`flex-1 flex flex-col transition-all duration-500 ease-in-out overflow-hidden ${
          isSidebarTransitioning ? "transition-none" : ""
        }`}
        style={{
          marginLeft: `${marginLeft}px`,
          marginRight: `${marginLeft - sidebarWidth}px`,
        }}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar ">
          <ChatInterface />
        </div>
        
      </main>

      {/* Mobile overlay backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="sticky inset-0 bg-black bg-opacity-50 z-30 m-4 transition-all duration-300"
          onClick={handleSidebarToggle}
        />
      )}
    </div>
  );
}

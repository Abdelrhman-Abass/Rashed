import React from "react";

import ChatSidebar from "../SideBar";

const Chat: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <ChatSidebar />
        <div className="flex-1 flex flex-col border-l border-gray-200"></div>
      </div>
    </div>
  );
};

export default Chat;

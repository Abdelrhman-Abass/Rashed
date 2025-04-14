// app/page.tsx
// import { ChatInterface } from '@/components/ChatInterface'
// import { Sidebar } from '@/components/Sidebar'

import ChatContainer from "@/components/layout/ChatContainer/ChatContainer";
import ChatInput from "@/components/layout/ChatInput/ChatInput";
import Sidebar from "@/components/layout/SideBar";

// import Sidebar from "@/components/Sidebar";
// import ChatContainer from "@/components/ChatContainer";
// import ChatInput from "@/components/ChatInput";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <ChatContainer />
        <ChatInput />
      </div>
    </div>
  );
}
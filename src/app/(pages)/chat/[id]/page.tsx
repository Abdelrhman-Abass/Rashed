import ChatContainer from "@/components/layout/ChatContainer/ChatContainer";
import ChatInput from "@/components/layout/ChatInput/ChatInput";
import ChatInterface from "@/components/layout/ChatInterface/ChatInterface";
import ChatSidebar from "@/components/layout/SideBar";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        {/* <ChatContainer />
        <ChatInput /> */}
        <ChatInterface />
      </div>
    </div>
  );
}

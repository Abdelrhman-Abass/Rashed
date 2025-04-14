// components/Chat.tsx
import React from 'react';
import ChatContainer from '../ChatContainer/ChatContainer';
import ChatInput from '../ChatInput/ChatInput';
import ChatSidebar from '../SideBar';
// import ChatSidebar from './ChatSidebar';
// import ChatHeader from './ChatHeader';
// import ChatMessages from './ChatMessages';
// import ChatInput from './ChatInput';

const Chat: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <ChatSidebar />

      {/* Main Chat Area */}
      {/* <div className="flex-1 flex flex-col border-l border-gray-200">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>  */}
           <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
       <ChatSidebar />
       <div className="flex-1 flex flex-col border-l border-gray-200">
         <ChatContainer />
        <ChatInput />
      </div>
     </div>
    </div>
  );
};
// import ChatContainer from "@/components/layout/ChatContainer/ChatContainer";
// import ChatInput from "@/components/layout/ChatInput/ChatInput";
// import Sidebar from "@/components/layout/SideBar";

// // import Sidebar from "@/components/Sidebar";
// // import ChatContainer from "@/components/ChatContainer";
// // import ChatInput from "@/components/ChatInput";

// export default function Home() {
//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       <Sidebar />
//       <div className="flex-1 flex flex-col md:ml-64">
//         <ChatContainer />
//         <ChatInput />
//       </div>
//     </div>
//   );
// }


export default Chat;
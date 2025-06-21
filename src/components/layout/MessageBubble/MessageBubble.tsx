// // import { Message } from "@/types/Types";
// // import { Download, Copy, Check } from "lucide-react"; // Added Check icon
// // import { useRef, useState } from "react";
// // import { showSuccessToast, showErrorToast } from "@/utils/toast";

// // const MessageBubble = ({
// //   message,
// //   isLast,
// //   onDownloadPDF,
// // }: {
// //   message: Message;
// //   isLast: boolean;
// //   onDownloadPDF: (messageId: string) => void;
// // }) => {
// //   const messageRef = useRef<HTMLDivElement>(null);
// //   const [isCopied, setIsCopied] = useState(false); // State to track copy status

// //   // Format timestamp to match the screenshot (e.g., "3:03:44 PM")
// //   const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
// //     hour: "numeric",
// //     minute: "2-digit",
// //     second: "2-digit",
// //     hour12: true,
// //   });

// //   // Handle copy to clipboard
// //   const handleCopy = async () => {
// //     try {
// //       await navigator.clipboard.writeText(message.content);
// //       setIsCopied(true); // Trigger icon change
// //       showSuccessToast("Message copied to clipboard!");
// //       // Revert to Copy icon after 5 seconds
// //       setTimeout(() => {
// //         setIsCopied(false);
// //       }, 5000);
// //     } catch (error) {
// //       console.error("Failed to copy message:", error);
// //       showErrorToast("Failed to copy message. Please try again.");
// //     }
// //   };

// //   return (
// //     <div
// //       className={`flex ${
// //         message.isFromBot ? "justify-start" : "justify-end"
// //       } mb-4`}
// //     >
// //       <div
// //         ref={messageRef}
// //         dir="auto"
// //         className={`message-bubble rounded-3xl prose dark:prose-invert break-words text-primary min-h-7 prose-p:opacity-95 prose-strong:opacity-100 bg-surface-l2 max-w-[100%] sm:max-w-[70%] px-4 py-2.5 whitespace-pre-wrap rounded-br-lg relative text-4xl ${
// //           message.isFromBot
// //             ? "bg-transparent text-white"
// //             : "bg-[#2e3033] text-[#fcfcfc]"
// //         } ${isLast ? "" : "mb-2"}`}
// //       >
// //         <div className="text-xl text-[#fcfcfc]">{message.content}</div>
// //         {message.isFromBot && (
// //           <div className="absolute left-[4%] bottom-[-30%] flex items-center gap-3 text-xs text-gray-400">
// //             {/* Copy Button with Animation */}
// //             <button
// //               onClick={handleCopy}
// //               className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
// //               title={isCopied ? "Message copied" : "Copy message"}
// //             >
// //               <div className="relative h-3 w-3">
// //                 <Copy
// //                   className={`h-3 w-3 transition-opacity duration-300 ${
// //                     isCopied ? "opacity-0" : "opacity-100"
// //                   }`}
// //                 />
// //                 <Check
// //                   className={`h-3 w-3 absolute top-0 left-0 transition-opacity duration-300 ${
// //                     isCopied ? "opacity-100" : "opacity-0"
// //                   } ${isCopied ? "text-green-400" : ""}`}
// //                 />
// //               </div>
// //               <span>{isCopied ? "Copied" : "Copy"}</span>
// //             </button>
// //             {/* Download PDF Button */}
// //             <button
// //               onClick={() => onDownloadPDF(message.id)}
// //               className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
// //               title="Download as PDF"
// //             >
// //               <Download className="h-3 w-3" />
// //               <span>PDF</span>
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MessageBubble;


// import { Message } from "@/types/Types";
// import { Download, Copy, Check } from "lucide-react";
// import { useRef, useState } from "react";
// import { showSuccessToast, showErrorToast } from "@/utils/toast";

// const MessageBubble = ({
//   message,
//   isLast,
//   onDownloadPDF,
// }: {
//   message: Message;
//   isLast: boolean;
//   onDownloadPDF: (messageId: string) => void;
// }) => {
//   const messageRef = useRef<HTMLDivElement>(null);
//   const [isCopied, setIsCopied] = useState(false);

//   // Format timestamp
//   const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
//     hour: "numeric",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//   });

//   // Handle copy to clipboard
//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(message.content);
//       setIsCopied(true);
//       showSuccessToast("Message copied to clipboard!");
//       setTimeout(() => setIsCopied(false), 5000);
//     } catch (error) {
//       console.error("Failed to copy message:", error);
//       showErrorToast("Failed to copy message. Please try again.");
//     }
//   };

//   return (
//     <div
//       className={`flex ${
//         message.isFromBot ? "justify-start" : "justify-end"
//       } mb-4`}
//     >
//       <div
//         ref={messageRef}
//         dir="auto"
//         className={`message-bubble rounded-3xl prose dark:prose-invert break-words text-primary min-h-7 prose-p:opacity-95 prose-strong:opacity-100 bg-surface-l2 max-w-[100%] sm:max-w-[70%] px-4 py-2.5 whitespace-pre-wrap rounded-br-lg relative text-4xl ${
//           message.isFromBot
//             ? "bg-transparent text-white"
//             : "bg-[#2e3033] text-[#fcfcfc]"
//         } ${isLast ? "" : "mb-2"}`}
//       >
//         {message.type === "FILE" && message.fileName ? (
//           <div className="flex items-center gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="w-6 h-6 text-indigo-500"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M6.75 3A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h10.5A2.25 2.25 0 0019.5 18.75V9.62a2.25 2.25 0 00-.659-1.591l-4.87-4.87A2.25 2.25 0 0012.38 3H6.75zM12 9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 9zM9 12.75a.75.75 0 01.75.75v.75H9a.75.75 0 010-1.5zm6.75 0a.75.75 0 00-1.5 0v.75h1.5v-.75z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span className="text-sm font-medium truncate max-w-[150px]">
//               {message.fileName}
//             </span>
//           </div>
//         ) : (
//           <div className="text-xl text-[#fcfcfc]">{message.content}</div>
//         )}
//         {message.isFromBot && (
//           <div className="absolute left-[4%] bottom-[-30%] flex items-center gap-3 text-xs text-gray-400">
//             <button
//               onClick={handleCopy}
//               className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
//               title={isCopied ? "Message copied" : "Copy message"}
//             >
//               <div className="relative h-3 w-3">
//                 <Copy
//                   className={`h-3 w-3 transition-opacity duration-300 ${
//                     isCopied ? "opacity-0" : "opacity-100"
//                   }`}
//                 />
//                 <Check
//                   className={`h-3 w-3 absolute top-0 left-0 transition-opacity duration-300 ${
//                     isCopied ? "opacity-100" : "opacity-0"
//                   } ${isCopied ? "text-green-400" : ""}`}
//                 />
//               </div>
//               <span>{isCopied ? "Copied" : "Copy"}</span>
//             </button>
//             <button
//               onClick={() => onDownloadPDF(message.id)}
//               className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
//               title="Download as PDF"
//             >
//               <Download className="h-3 w-3" />
//               <span>PDF</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;


// In MessageBubble.tsx

// import { Message } from '@/types/Types';
// import { Download, Copy, Check } from 'lucide-react';
// import { useRef, useState } from 'react';
// import { showSuccessToast, showErrorToast } from '@/utils/toast';

// const MessageBubble = ({
//   message,
//   isLast,
//   onDownloadPDF,
// }: {
//   message: Message;
//   isLast: boolean;
//   onDownloadPDF: (messageId: string) => void;
// }) => {
//   const messageRef = useRef<HTMLDivElement>(null);
//   const [isCopied, setIsCopied] = useState(false);

//   const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
//     hour: 'numeric',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true,
//   });

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(message.content);
//       setIsCopied(true);
//       showSuccessToast('Message copied to clipboard!');
//       setTimeout(() => setIsCopied(false), 5000);
//     } catch (error) {
//       console.error('Failed to copy message:', error);
//       showErrorToast('Failed to copy message. Please try again.');
//     }
//   };

//   return (
//     <div
//       className={`flex ${
//         message.isFromBot ? 'justify-start' : 'justify-end'
//       } mb-4`}
//     >
//       <div
//         ref={messageRef}
//         dir="auto"
//         className={`message-bubble rounded-3xl prose dark:prose-invert break-words text-primary min-h-7 prose-p:opacity-95 prose-strong:opacity-100 bg-surface-l2 max-w-[100%] sm:max-w-[70%] px-4 py-2.5 whitespace-pre-wrap rounded-br-lg relative text-4xl ${
//           message.isFromBot
//             ? 'bg-transparent text-white'
//             : 'bg-[#2e3033] text-[#fcfcfc]'
//         } ${isLast ? '' : 'mb-2'}`}
//       >
//         {message.type === 'FILE' && message.fileName ? (
//           <div className="flex items-center gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="w-6 h-6 text-indigo-500"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M6.75 3A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h10.5A2.25 2.25 0 0019.5 18.75V9.62a2.25 2.25 0 00-.659-1.591l-4.87-4.87A2.25 2.25 0 0012.38 3H6.75zM12 9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 9zM9 12.75a.75.75 0 01.75.75v.75H9a.75.75 0 010-1.5zm6.75 0a.75.75 0 00-1.5 0v.75h1.5v-.75z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span className="text-sm font-medium truncate max-w-[200px]">
//               {message.fileName}
//             </span>
//           </div>
//         ) : (
//           <div className="text-xl text-[#fcfcfc]">{message.content}</div>
//         )}
//         {message.isFromBot && (
//           <div className="absolute left-[4%] bottom-[-30%] flex items-center gap-3 text-xs text-gray-400">
//             <button
//               onClick={handleCopy}
//               className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
//               title={isCopied ? 'Message copied' : 'Copy message'}
//             >
//               <div className="relative h-3 w-3">
//                 <Copy
//                   className={`h-3 w-3 transition-opacity duration-300 ${
//                     isCopied ? 'opacity-0' : 'opacity-100'
//                   }`}
//                 />
//                 <Check
//                   className={`h-3 w-3 absolute top-0 left-0 transition-opacity duration-300 ${
//                     isCopied ? 'opacity-100' : 'opacity-0'
//                   } ${isCopied ? 'text-green-400' : ''}`}
//                 />
//               </div>
//               <span>{isCopied ? 'Copied' : 'Copy'}</span>
//             </button>
//             <button
//               onClick={() => onDownloadPDF(message.id)}
//               className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
//               title="Download as PDF"
//             >
//               <Download className="h-3 w-3" />
//               <span>PDF</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;


import { Message } from '@/types/Types';
import { Download, Copy, Check } from 'lucide-react';
import { useRef, useState } from 'react';
import { showSuccessToast, showErrorToast } from '@/utils/toast';

const MessageBubble = ({
  message,
  isLast,
  onDownloadPDF,
}: {
  message: Message;
  isLast: boolean;
  onDownloadPDF: (messageId: string) => void;
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      showSuccessToast('Message copied to clipboard!');
      setTimeout(() => setIsCopied(false), 5000);
    } catch (error) {
      console.error('Failed to copy message:', error);
      showErrorToast('Failed to copy message. Please try again.');
    }
  };

  return (
    <div
      className={`flex ${message.isFromBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        ref={messageRef}
        dir="auto"
        className={`message-bubble rounded-3xl prose dark:prose-invert break-words text-primary min-h-7 prose-p:opacity-95 prose-strong:opacity-100 bg-surface-l2 max-w-[100%] sm:max-w-[70%] px-4 py-2.5 whitespace-pre-wrap rounded-br-lg relative text-4xl ${
          message.isFromBot
            ? 'bg-transparent text-white'
            : 'bg-[#2e3033] text-[#fcfcfc]'
        } ${isLast ? '' : 'mb-2'}`}
      >
        {message.type === 'FILE' && message.fileName ? (
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-indigo-500"
            >
              <path
                fillRule="evenodd"
                d="M6.75 3A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h10.5A2.25 2.25 0 0019.5 18.75V9.62a2.25 2.25 0 00-.659-1.591l-4.87-4.87A2.25 2.25 0 0012.38 3H6.75zM12 9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 9zM9 12.75a.75.75 0 01.75.75v.75H9a.75.75 0 010-1.5zm6.75 0a.75.75 0 00-1.5 0v.75h1.5v-.75z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium truncate max-w-[200px]">
              {message.fileName}
            </span>
          </div>
        ) : (
          <div className="text-xl text-[#fcfcfc]">{message.content}</div>
        )}
        {message.isFromBot && (
          <div className="absolute left-[4%] bottom-[-30%] flex items-center gap-3 text-xs text-gray-400">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
              title={isCopied ? 'Message copied' : 'Copy message'}
            >
              <div className="relative h-3 w-3">
                <Copy
                  className={`h-3 w-3 transition-opacity duration-300 ${
                    isCopied ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <Check
                  className={`h-3 w-3 absolute top-0 left-0 transition-opacity duration-300 ${
                    isCopied ? 'opacity-100' : 'opacity-0'
                  } ${isCopied ? 'text-green-400' : ''}`}
                />
              </div>
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() => onDownloadPDF(message.id)}
              className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
              title="Download as PDF"
            >
              <Download className="h-3 w-3" />
              <span>PDF</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
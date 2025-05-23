// import { Message } from "@/types/Types";
// import { Download } from "lucide-react";
// import { useRef } from "react";


// const MessageBubble = ({
//     message,
//     isLast,
//     onDownloadPDF,
// }: {
//     message: Message;
//     isLast: boolean;
//     onDownloadPDF: (messageId: string) => void;
// }) => {
//     const messageRef = useRef<HTMLDivElement>(null);

//     // Format timestamp to match the screenshot (e.g., "3:03:44 PM")
//     const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
//         hour: "numeric",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//     });

//     return (
//         <div
//             className={`flex  ${message.isFromBot ? "justify-start" : "justify-end"} mb-4`}
//         >

//             <div
//                 ref={messageRef}
//                 dir="auto"

//                 className={`message-bubble rounded-3xl prose dark:prose-invert break-words text-primary min-h-7 prose-p:opacity-95 prose-strong:opacity-100 bg-surface-l2   max-w-[100%] sm:max-w-[70%] px-4 py-2.5 whitespace-pre-wrap rounded-br-lg relative text-4xl ${message.isFromBot ? "bg-transparent text-white" : "bg-[#2e3033] text-[#fcfcfc]"
//                     } ${isLast ? "" : "mb-2"}`}
//             >
//                 <div className="text-xl text-[#fcfcfc]">{message.content}</div>
//                 {message.isFromBot && (
//                     <button
//                         onClick={() => onDownloadPDF(message.id)}
//                         className="absolute right-2 bottom-2 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
//                         title="Download as PDF"
//                     >
//                         <Download className="h-3 w-3" />
//                         <span>PDF</span>
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };


// export default MessageBubble;


import { Message } from "@/types/Types";
import { Download, Copy, Check } from "lucide-react"; // Added Check icon
import { useRef, useState } from "react";
import { showSuccessToast, showErrorToast } from "@/utils/toast";

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
  const [isCopied, setIsCopied] = useState(false); // State to track copy status

  // Format timestamp to match the screenshot (e.g., "3:03:44 PM")
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true); // Trigger icon change
      showSuccessToast("Message copied to clipboard!");
      // Revert to Copy icon after 5 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to copy message:", error);
      showErrorToast("Failed to copy message. Please try again.");
    }
  };

  return (
    <div
      className={`flex ${message.isFromBot ? "justify-start" : "justify-end"} mb-4`}
    >
      <div
        ref={messageRef}
        dir="auto"
        className={`message-bubble rounded-3xl prose dark:prose-invert break-words text-primary min-h-7 prose-p:opacity-95 prose-strong:opacity-100 bg-surface-l2 max-w-[100%] sm:max-w-[70%] px-4 py-2.5 whitespace-pre-wrap rounded-br-lg relative text-4xl ${
          message.isFromBot ? "bg-transparent text-white" : "bg-[#2e3033] text-[#fcfcfc]"
        } ${isLast ? "" : "mb-2"}`}
      >
        <div className="text-xl text-[#fcfcfc]">{message.content}</div>
        {message.isFromBot && (
          <div className="absolute left-[4%] bottom-[-30%] flex items-center gap-3 text-xs text-gray-400">
            {/* Copy Button with Animation */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
              title={isCopied ? "Message copied" : "Copy message"}
            >
              <div className="relative h-3 w-3">
                <Copy
                  className={`h-3 w-3 transition-opacity duration-300 ${
                    isCopied ? "opacity-0" : "opacity-100"
                  }`}
                />
                <Check
                  className={`h-3 w-3 absolute top-0 left-0 transition-opacity duration-300 ${
                    isCopied ? "opacity-100" : "opacity-0"
                  } ${isCopied ? "text-green-400" : ""}`}
                />
              </div>
              <span>{isCopied ? "Copied" : "Copy"}</span>
            </button>
            {/* Download PDF Button */}
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

// import { Message } from "@/types/Types";
// import { Download, Copy } from "lucide-react"; // Added Copy icon
// import { useRef } from "react";
// import { showSuccessToast, showErrorToast } from "@/utils/toast"; // Import toast utilities

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

//   // Format timestamp to match the screenshot (e.g., "3:03:44 PM")
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
//       showSuccessToast("Message copied to clipboard!");
//     } catch (error) {
//       console.error("Failed to copy message:", error);
//       showErrorToast("Failed to copy message. Please try again.");
//     }
//   };

//   return (
//     <div
//       className={`flex ${message.isFromBot ? "justify-start" : "justify-end"} mb-4`}
//     >
//       <div
//         ref={messageRef}
//         dir="auto"
//         className={`message-bubble rounded-3xl prose dark:prose-invert break-words text-primary min-h-7 prose-p:opacity-95 prose-strong:opacity-100 bg-surface-l2 max-w-[100%] sm:max-w-[70%] px-4 py-2.5 whitespace-pre-wrap rounded-br-lg relative text-4xl ${
//           message.isFromBot ? "bg-transparent text-white" : "bg-[#2e3033] text-[#fcfcfc]"
//         } ${isLast ? "" : "mb-2"}`}
//       >
//         <div className="text-xl text-[#fcfcfc]">{message.content}</div>
//         {message.isFromBot && (
//           <div className="absolute left-[4%] bottom-[-30%]  flex items-center gap-3 text-xs text-gray-400">
//             {/* Copy Button */}
//             <button
//               onClick={handleCopy}
//               className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
//               title="Copy message"
//             >
//               <Copy className="h-3 w-3" />
//               <span>Copy</span>
//             </button>
//             {/* Download PDF Button */}
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
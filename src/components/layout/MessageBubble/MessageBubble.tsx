import { Message } from "@/types/Types";
import { Download } from "lucide-react";
import { useRef } from "react";


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

    // Format timestamp to match the screenshot (e.g., "3:03:44 PM")
    const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <div
            className={`flex  ${message.isFromBot ? "justify-start" : "justify-end"} mb-4`}
        >

            <div
                ref={messageRef}
                dir="auto"

                className={`message-bubble rounded-3xl prose dark:prose-invert break-words text-primary min-h-7 prose-p:opacity-95 prose-strong:opacity-100 bg-surface-l2 border border-border-l1 max-w-[100%] sm:max-w-[90%] px-4 py-2.5 whitespace-pre-wrap rounded-br-lg relative text-4xl ${message.isFromBot ? "bg-transparent text-white" : "bg-[#2e3033] text-[#fcfcfc]"
                    } ${isLast ? "" : "mb-2"}`}
            >
                <div className="text-xl text-[#fcfcfc]">{message.content}</div>
                {message.isFromBot && (
                    <button
                        onClick={() => onDownloadPDF(message.id)}
                        className="absolute right-2 bottom-2 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
                        title="Download as PDF"
                    >
                        <Download className="h-3 w-3" />
                        <span>PDF</span>
                    </button>
                )}
            </div>
        </div>
    );
};


export default MessageBubble;
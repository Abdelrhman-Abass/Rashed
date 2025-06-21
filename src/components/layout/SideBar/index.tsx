
// "use client";

// import { useEffect, useRef, useMemo, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   Menu,
//   X,
//   Search,
//   Plus,
//   Trash2,
//   MoreVertical,
//   Edit,
//   Check,
//   XCircle,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// import { useChatStore } from "@/store/chatStore";
// import { useAuthStore } from "@/store/authStore";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
// import { getServerRequest, postServerRequest, deleteServerRequest, patchServerRequest } from "@/utils/generalServerRequest";
// import { showSuccessToast, showErrorToast } from "@/utils/toast";

// interface Conversation {
//   id: string;
//   title: string;
//   createdAt: string;
// }

// export default function Sidebar() {
//   const {
//     sidebarOpen,
//     isCollapsed,
//     toggleSidebar,
//     setSidebarOpen,
//     toggleCollapse,
//     setCollapsed,
//   } = useChatStore();
//   const { token, user } = useAuthStore();
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const { id: currentSessionId } = useParams();
//   const queryClient = useQueryClient();

//   // State for dropdown menu and rename input
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
//   const [newTitle, setNewTitle] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch conversations
//   const {
//     data: conversationsResponse,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["conversations"],
//     queryFn: async () => {
//       const response = await getServerRequest("/list/chat-sessions");
//       return response;
//     },
//     select: (response) => {
//       const sessions = response.success && Array.isArray(response.data.data)
//         ? response.data.data
//         : [];
//       return sessions;
//     },
//   });

//   const conversations = useMemo(() => {
//     const convArray = Array.isArray(conversationsResponse)
//       ? conversationsResponse
//       : [];
//     return convArray.filter((conversation: Conversation) =>
//       conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [conversationsResponse, searchQuery]);

//   // Create new chat
//   const { mutate: createNewChat, isPending: isCreating } = useMutation({
//     mutationFn: () =>
//       postServerRequest("/messages/session", { title: "New Chat" }),
//     onSuccess: (response) => {
//       if (response?.data?.success) {
//         const newSessionId = response.data.data.sessionId;
//         router.push(`/chat/${newSessionId}`);
//         if (isMobile) {
//           setSidebarOpen(false);
//         }
//         showSuccessToast("New chat created!");
//       } else {
//         showErrorToast(response.message || "Failed to create new chat.");
//       }
//     },
//     onError: (error: any) => {
//       showErrorToast(
//         "An error occurred while creating the chat: " +
//         (error.message || "Unknown error")
//       );
//     },
//   });

//   // Delete chat
//   const { mutate: deleteChat, isPending: isDeleting } = useMutation({
//     mutationFn: (sessionId: string) =>
//       deleteServerRequest(`/messages/delete-session/${sessionId}`),
//     onSuccess: (response, sessionId) => {
//       if (response?.success) {
//         showSuccessToast("Chat deleted successfully!");
//         queryClient.invalidateQueries({ queryKey: ["conversations"] });
//         if (currentSessionId === sessionId) {
//           const remainingChats = conversations.filter(
//             (conv: Conversation) => conv.id !== sessionId
//           );
//           if (remainingChats.length > 0) {
//             router.push(`/chat/${remainingChats[0].id}`);
//           } else {
//             router.push("/chat");
//           }
//         }
//         if (isMobile) {
//           setSidebarOpen(false);
//         }
//       } else {
//         showErrorToast(response.message || "Failed to delete chat.");
//       }
//     },
//     onError: (error: any) => {
//       showErrorToast(
//         "An error occurred while deleting the chat: " +
//         (error.message || "Unknown error")
//       );
//     },
//   });

//   // Rename chat
//   const { mutate: renameChat, isPending: isRenaming } = useMutation({
//     mutationFn: ({ sessionId, title }: { sessionId: string; title: string }) =>
//       patchServerRequest(`/messages/rename-session/${sessionId}`, { title }),
//     onSuccess: (response, { sessionId }) => {
//       if (response?.success) {
//         showSuccessToast("Chat renamed successfully!");
//         queryClient.invalidateQueries({ queryKey: ["conversations"] });
//         setEditingSessionId(null);
//         setNewTitle("");
//         if (isMobile) {
//           setSidebarOpen(false);
//         }
//       } else {
//         showErrorToast(response.message || "Failed to rename chat.");
//       }
//     },
//     onError: (error: any) => {
//       showErrorToast(
//         "An error occurred while renaming the chat: " +
//         (error.message || "Unknown error")
//       );
//     },
//   });

//   // Sidebar effects
//   useEffect(() => {
//     if (isMobile && isCollapsed) {
//       setCollapsed(false);
//     }
//   }, [isMobile, isCollapsed, setCollapsed]);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         isMobile &&
//         sidebarOpen &&
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node)
//       ) {
//         setSidebarOpen(false);
//         setActiveMenu(null);
//         setEditingSessionId(null);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMobile, sidebarOpen, setSidebarOpen]);

//   useEffect(() => {
//     setSidebarOpen(!isMobile);
//   }, [isMobile, setSidebarOpen]);

//   // Handle navigation to a chat session
//   const handleConversationClick = (conversationId: string) => {
//     router.push(`/chat/${conversationId}`);
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//     setActiveMenu(null);
//     setEditingSessionId(null);
//   };

//   // Toggle dropdown menu
//   const toggleMenu = (conversationId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setActiveMenu(activeMenu === conversationId ? null : conversationId);
//     setEditingSessionId(null);
//   };

//   // Handle rename action
//   const handleRename = (conversationId: string, currentTitle: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setEditingSessionId(conversationId);
//     setNewTitle(currentTitle);
//     setActiveMenu(null);
//   };

//   // Handle rename submission
//   const handleRenameSubmit = (sessionId: string, e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newTitle.trim()) return;
//     renameChat({ sessionId, title: newTitle.trim() });
//   };

//   // Handle rename cancel
//   const handleRenameCancel = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setEditingSessionId(null);
//     setNewTitle("");
//   };

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   // Format timestamp for display
//   const formatTimestamp = (createdAt: string) => {
//     const date = new Date(createdAt);
//     const now = new Date();
//     const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

//     if (diffInHours < 24) {
//       return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     } else if (diffInHours < 24 * 7) {
//       return date.toLocaleDateString([], { weekday: "short" });
//     } else {
//       return date.toLocaleDateString([], { month: "short", day: "numeric" });
//     }
//   };

//   return (
//     <>
//       {isMobile && !sidebarOpen && (
//         <button
//           className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0f0f23] text-zinc-100 shadow-lg md:hidden hover:scale-105 transition-transform"
//           onClick={() => toggleSidebar()}
//           aria-label="Open menu"
//         >
//           <Menu size={24} />
//         </button>
//       )}

//       <div
//         ref={sidebarRef}
//         className={`fixed bg-[#0f0f23] inset-y-0 left-0 text-zinc-100 shadow-lg transform transition-all duration-300 ease-in-out z-40
//           ${isMobile ? "w-64" : isCollapsed ? "w-16" : "w-64"}
//           ${isMobile
//             ? sidebarOpen
//               ? "translate-x-0"
//               : "-translate-x-full"
//             : "translate-x-0"
//           }`}
//       >
//         <div className="flex h-full flex-col p-3 overflow-hidden bg-[#0f0f23]">
//           {/* Header */}
//           <div
//             className={`flex items-center ${isCollapsed && !isMobile ? "justify-center" : "justify-between"
//               } pb-4 pt-2 border-b border-zinc-800`}
//           >
//             {(!isCollapsed || isMobile) && (
//               <div className="mt-4 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search size={16} className="text-zinc-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search conversations"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className="w-full pl-10 pr-10 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={() => setSearchQuery("")}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     aria-label="Clear search"
//                   >
//                     <XCircle size={16} className="text-zinc-400 hover:text-zinc-100" />
//                   </button>
//                 )}
//               </div>
//             )}
//             {isMobile && sidebarOpen && (
//               <button
//                 onClick={() => toggleSidebar()}
//                 className="p-1 rounded-md hover:bg-zinc-800"
//                 aria-label="Close menu"
//               >
//                 <X size={20} />
//               </button>
//             )}
//             {!isMobile && (
//               <button
//                 onClick={toggleCollapse}
//                 className="p-1 rounded-md hover:bg-zinc-800"
//                 aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//               >
//                 {isCollapsed ? <Menu size={20} /> : <X size={20} />}
//               </button>
//             )}
//           </div>

//           {/* New Chat Button */}
//           <button
//             onClick={() => createNewChat()}
//             disabled={isCreating}
//             className={`w-full mt-4 px-4 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white transition-colors rounded-lg flex items-center ${isCollapsed && !isMobile
//                 ? "justify-center"
//                 : "justify-center gap-x-2"
//               } ${isCreating ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             <Plus size={18} />
//             {!isCollapsed && (
//               <span className="text-sm font-medium">New Chat</span>
//             )}
//           </button>

//           {/* Search Bar */}
//           {(!isCollapsed || isMobile) && (
//             <div className="mt-4 relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search size={16} className="text-zinc-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search conversations"
//                 className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               />
//             </div>
//           )}

//           {/* Recent Chats */}
//           {(!isCollapsed || isMobile) && (
//             <div className="mt-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
//               <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//                 Recent Chats
//               </h3>
//               {isLoading ? (
//                 <div className="text-center text-zinc-400">Loading...</div>
//               ) : error ? (
//                 <div className="text-center text-red-500">
//                   Error: {(error as any)?.message || "Failed to load chats"}
//                 </div>
//               ) : conversations.length === 0 ? (
//                 <div className="text-center text-zinc-400">
//                   {searchQuery
//                     ? "No chats match your search"
//                     : "No chats available"}
//                 </div>
//               ) : (
//                 <ul className="space-y-1">
//                   {conversations.map((conversation: Conversation) => (
//                     <li
//                       key={conversation.id}
//                       className="px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors group relative"
//                     >
//                       <div className="flex items-center">
//                         {editingSessionId === conversation.id ? (
//                           <div className="flex-1">
//                             <form
//                               onSubmit={(e) => handleRenameSubmit(conversation.id, e)}
//                               className="flex flex-col gap-2"
//                             >
//                               <input
//                                 type="text"
//                                 value={newTitle}
//                                 onChange={(e) => setNewTitle(e.target.value)}
//                                 onClick={(e) => e.stopPropagation()}
//                                 className="w-full px-2 py-1 bg-zinc-700 border border-zinc-600 rounded-md text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                                 autoFocus
//                                 maxLength={100}
//                               />
//                               <div className="flex gap-2">
//                                 <button
//                                   type="submit"
//                                   disabled={isRenaming || !newTitle.trim()}
//                                   className={`p-1 rounded-md ${isRenaming || !newTitle.trim()
//                                       ? "opacity-50 cursor-not-allowed"
//                                       : "hover:bg-indigo-600"
//                                     }`}
//                                   aria-label="Save rename"
//                                 >
//                                   <Check size={16} className="text-zinc-100" />
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={handleRenameCancel}
//                                   className="p-1 rounded-md hover:bg-red-600"
//                                   aria-label="Cancel rename"
//                                 >
//                                   <XCircle size={16} className="text-zinc-100" />
//                                 </button>
//                               </div>
//                             </form>
//                           </div>
//                         ) : (
//                           <>
//                             <div
//                               className="flex-1 truncate cursor-pointer"
//                               onClick={() => handleConversationClick(conversation.id)}
//                             >
//                               <div className="flex items-center justify-between mb-1">
//                                 <span className="text-sm font-semibold truncate flex-grow">
//                                   {conversation.title}
//                                 </span>
//                                 <div className="flex items-center gap-2">
//                                   <span className="text-xs text-zinc-400">
//                                     {formatTimestamp(conversation.createdAt)}
//                                   </span>
//                                   <button
//                                     onClick={(e) => toggleMenu(conversation.id, e)}
//                                     className="p-1 rounded-md hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
//                                     aria-label="Chat options"
//                                   >
//                                     <MoreVertical
//                                       size={16}
//                                       className="text-zinc-400"
//                                     />
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                             <AnimatePresence>
//                               {activeMenu === conversation.id && (
//                                 <motion.div
//                                   initial={{ opacity: 0, scale: 0.8, y: -10 }}
//                                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                                   exit={{ opacity: 0, scale: 0.8, y: -10 }}
//                                   transition={{ duration: 0.2 }}
//                                   className="absolute right-2 top-8 z-50 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg"
//                                 >
//                                   <button
//                                     onClick={(e) =>
//                                       handleRename(
//                                         conversation.id,
//                                         conversation.title,
//                                         e
//                                       )
//                                     }
//                                     className="w-full px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-700 flex items-center gap-2"
//                                   >
//                                     <Edit size={14} />
//                                     Rename
//                                   </button>
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       deleteChat(conversation.id);
//                                       setActiveMenu(null);
//                                     }}
//                                     className="w-full px-4 py-2 text-sm text-zinc-100 hover:bg-red-600 flex items-center gap-2"
//                                   >
//                                     <Trash2 size={14} />
//                                     Delete
//                                   </button>
//                                 </motion.div>
//                               )}
//                             </AnimatePresence>
//                           </>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           )}

//           {/* User Profile */}
//           <div
//             className={`mt-auto pt-4 border-t border-zinc-800 ${isCollapsed && !isMobile ? "px-0" : "px-3"
//               }`}
//           >
//             <div
//               className={`flex items-center ${isCollapsed && !isMobile ? "justify-center" : "gap-x-3"
//                 }`}
//             >
//               <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold">
//                 {user?.userName?.charAt(0)?.toUpperCase() || "?"}
//               </div>
//               {!isCollapsed && (
//                 <div className="min-w-0">
//                   <p className="text-sm font-medium truncate">
//                     {user?.userName || "Guest"}
//                   </p>
//                   <p className="text-xs text-zinc-400 truncate">
//                     {user?.email || "No email"}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile overlay */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => {
//             setSidebarOpen(false);
//             setActiveMenu(null);
//             setEditingSessionId(null);
//           }}
//         />
//       )}
//     </>
//   );
// }



"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Menu,
  X,
  Search,
  Plus,
  Trash2,
  MoreVertical,
  Edit,
  Check,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getServerRequest, postServerRequest, deleteServerRequest, patchServerRequest } from "@/utils/generalServerRequest";
import { showSuccessToast, showErrorToast } from "@/utils/toast";

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
}

export default function Sidebar() {
  const {
    sidebarOpen,
    isCollapsed,
    toggleSidebar,
    setSidebarOpen,
    toggleCollapse,
    setCollapsed,
  } = useChatStore();
  const { token, user } = useAuthStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id: currentSessionId } = useParams();
  const queryClient = useQueryClient();

  // State for dropdown menu, rename input, and search query
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  // Fetch conversations
  const {
    data: conversationsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const response = await getServerRequest("/list/chat-sessions");
      return response;
    },
    select: (response) => {
      const sessions = response.success && Array.isArray(response.data.data)
        ? response.data.data
        : [];
      return sessions;
    },
  });

  const conversations = useMemo(() => {
    const convArray = Array.isArray(conversationsResponse)
      ? conversationsResponse
      : [];
    // Filter conversations based on search query
    return convArray.filter((conversation: Conversation) =>
      conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversationsResponse, searchQuery]);

  // Create new chat
  const { mutate: createNewChat, isPending: isCreating } = useMutation({
    mutationFn: () =>
      postServerRequest("/messages/session", { title: "New Chat" }),
    onSuccess: (response) => {
      if (response?.data?.success) {
        const newSessionId = response.data.data.sessionId;
        router.push(`/chat/${newSessionId}`);
        if (isMobile) {
          setSidebarOpen(false);
        }
        showSuccessToast("New chat created!");
      } else {
        showErrorToast(response.message || "Failed to create new chat.");
      }
    },
    onError: (error: any) => {
      showErrorToast(
        "An error occurred while creating the chat: " +
          (error.message || "Unknown error")
      );
    },
  });

  // Delete chat
  const { mutate: deleteChat, isPending: isDeleting } = useMutation({
    mutationFn: (sessionId: string) =>
      deleteServerRequest(`/messages/delete-session/${sessionId}`),
    onSuccess: (response, sessionId) => {
      if (response?.success) {
        showSuccessToast("Chat deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        if (currentSessionId === sessionId) {
          const remainingChats = conversations.filter(
            (conv: Conversation) => conv.id !== sessionId
          );
          if (remainingChats.length > 0) {
            router.push(`/chat/${remainingChats[0].id}`);
          } else {
            router.push("/chat");
          }
        }
        if (isMobile) {
          setSidebarOpen(false);
        }
      } else {
        showErrorToast(response.message || "Failed to delete chat.");
      }
    },
    onError: (error: any) => {
      showErrorToast(
        "An error occurred while deleting the chat: " +
          (error.message || "Unknown error")
      );
    },
  });

  // Rename chat
  const { mutate: renameChat, isPending: isRenaming } = useMutation({
    mutationFn: ({ sessionId, title }: { sessionId: string; title: string }) =>
      patchServerRequest(`/messages/rename-session/${sessionId}`, { title }),
    onSuccess: (response, { sessionId }) => {
      if (response?.success) {
        showSuccessToast("Chat renamed successfully!");
        // Invalidate both conversations and specific chatInfo query
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        queryClient.invalidateQueries({ queryKey: ["chatInfo", sessionId] });
        setEditingSessionId(null);
        setNewTitle("");
        if (isMobile) {
          setSidebarOpen(false);
        }
      } else {
        showErrorToast(response.message || "Failed to rename chat.");
      }
    },
    onError: (error: any) => {
      showErrorToast(
        "An error occurred while renaming the chat: " +
          (error.message || "Unknown error")
      );
    },
  });

  // Sidebar effects
  useEffect(() => {
    if (isMobile && isCollapsed) {
      setCollapsed(false);
    }
  }, [isMobile, isCollapsed, setCollapsed]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isMobile &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
        setActiveMenu(null);
        setEditingSessionId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile, setSidebarOpen]);

  // Handle navigation to a chat session
  const handleConversationClick = (conversationId: string) => {
    router.push(`/chat/${conversationId}`);
    if (isMobile) {
      setSidebarOpen(false);
    }
    setActiveMenu(null);
    setEditingSessionId(null);
  };

  // Toggle dropdown menu
  const toggleMenu = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === conversationId ? null : conversationId);
    setEditingSessionId(null);
  };

  // Handle rename action
  const handleRename = (conversationId: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(conversationId);
    setNewTitle(currentTitle);
    setActiveMenu(null);
  };

  // Handle rename submission
  const handleRenameSubmit = (sessionId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    renameChat({ sessionId, title: newTitle.trim() });
  };

  // Handle rename cancel
  const handleRenameCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(null);
    setNewTitle("");
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Format timestamp for display
  const formatTimestamp = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <>
      {isMobile && !sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0f0f23] text-zinc-100 shadow-lg md:hidden hover:scale-105 transition-transform"
          onClick={() => toggleSidebar()}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      )}

      <div
        ref={sidebarRef}
        className={`fixed bg-[#0f0f23] inset-y-0 left-0 text-zinc-100 shadow-lg transform transition-all duration-300 ease-in-out z-40
          ${isMobile ? "w-64" : isCollapsed ? "w-16" : "w-64"}
          ${
            isMobile
              ? sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }`}
      >
        <div className="flex h-full flex-col p-3 overflow-hidden bg-[#0f0f23]">
          {/* Header */}
          <div
            className={`flex items-center ${
              isCollapsed && !isMobile ? "justify-center" : "justify-between"
            } pb-4 pt-2 border-b border-zinc-800`}
          >
            {(!isCollapsed || isMobile) && (
              <div className="flex items-center gap-x-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center">
                  <Image
                    src="/assets/logo.webp"
                    height={35}
                    width={35}
                    loading="lazy"
                    alt="logo"
                  />
                </div>
                {!isCollapsed && (
                  <h2 className="text-xl font-bold">Rashed</h2>
                )}
              </div>
            )}
            {isMobile && sidebarOpen && (
              <button
                onClick={() => toggleSidebar()}
                className="p-1 rounded-md hover:bg-zinc-800"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            )}
            {!isMobile && (
              <button
                onClick={toggleCollapse}
                className="p-1 rounded-md hover:bg-zinc-800"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <Menu size={20} /> : <X size={20} />}
              </button>
            )}
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => createNewChat()}
            disabled={isCreating}
            className={`w-full mt-4 px-4 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white transition-colors rounded-lg flex items-center ${
              isCollapsed && !isMobile
                ? "justify-center"
                : "justify-center gap-x-2"
            } ${isCreating ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Plus size={18} />
            {!isCollapsed && (
              <span className="text-sm font-medium">New Chat</span>
            )}
          </button>

          {/* Search Bar */}
          {(!isCollapsed || isMobile) && (
            <div className="mt-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder="Search conversations"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Recent Chats */}
          {(!isCollapsed || isMobile) && (
            <div className="mt-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Recent Chats
              </h3>
              {isLoading ? (
                <div className="text-center text-zinc-400">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500">
                  Error: {(error as any)?.message || "Failed to load chats"}
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center text-zinc-400">
                  {searchQuery
                    ? "No chats match your search"
                    : "No chats available"}
                </div>
              ) : (
                <ul className="space-y-1">
                  {conversations.map((conversation: Conversation) => (
                    <li
                      key={conversation.id}
                      className="px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors group relative"
                    >
                      <div className="flex items-center">
                        {editingSessionId === conversation.id ? (
                          <div className="flex-1">
                            <form
                              onSubmit={(e) => handleRenameSubmit(conversation.id, e)}
                              className="flex flex-col gap-2"
                            >
                              <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full px-2 py-1 bg-zinc-700 border border-zinc-600 rounded-md text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                autoFocus
                                maxLength={100}
                              />
                              <div className="flex gap-2">
                                <button
                                  type="submit"
                                  disabled={isRenaming || !newTitle.trim()}
                                  className={`p-1 rounded-md ${
                                    isRenaming || !newTitle.trim()
                                      ? "opacity-50 cursor-not-allowed"
                                      : "hover:bg-indigo-600"
                                  }`}
                                  aria-label="Save rename"
                                >
                                  <Check size={16} className="text-zinc-100" />
                                </button>
                                <button
                                  type="button"
                                  onClick={handleRenameCancel}
                                  className="p-1 rounded-md hover:bg-red-600"
                                  aria-label="Cancel rename"
                                >
                                  <XCircle size={16} className="text-zinc-100" />
                                </button>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <>
                            <div
                              className="flex-1 truncate cursor-pointer"
                              onClick={() => handleConversationClick(conversation.id)}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold truncate flex-grow">
                                  {conversation.title}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-zinc-400">
                                    {formatTimestamp(conversation.createdAt)}
                                  </span>
                                  <button
                                    onClick={(e) => toggleMenu(conversation.id, e)}
                                    className="p-1 rounded-md hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
                                    aria-label="Chat options"
                                  >
                                    <MoreVertical
                                      size={16}
                                      className="text-zinc-400"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <AnimatePresence>
                              {activeMenu === conversation.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute right-2 top-8 z-50 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg"
                                >
                                  <button
                                    onClick={(e) =>
                                      handleRename(
                                        conversation.id,
                                        conversation.title,
                                        e
                                      )
                                    }
                                    className="w-full px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-700 flex items-center gap-2"
                                  >
                                    <Edit size={14} />
                                    Rename
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteChat(conversation.id);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full px-4 py-2 text-sm text-zinc-100 hover:bg-red-600 flex items-center gap-2"
                                  >
                                    <Trash2 size={14} />
                                    Delete
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* User Profile */}
          <div
            className={`mt-auto pt-4 border-t border-zinc-800 ${
              isCollapsed && !isMobile ? "px-0" : "px-3"
            }`}
          >
            <div
              className={`flex items-center ${
                isCollapsed && !isMobile ? "justify-center" : "gap-x-3"
              }`}
            >
              <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold">
                {user?.userName?.charAt(0)?.toUpperCase() || "?"}
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.userName || "Guest"}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {user?.email || "No email"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setActiveMenu(null);
            setEditingSessionId(null);
          }}
        />
      )}
    </>
  );
}
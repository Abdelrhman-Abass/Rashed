"use client";

import { useChatStore } from "@/store/chatStore";
import {
  Menu,
  X,
  Search,
  Plus,
  MessageSquare,
  Settings,
  Home,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const fakeConversations = [
  {
    id: "1",
    title: "Getting started with AI",
    lastMessage: "How do I begin with machine learning?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    title: "Project discussion",
    lastMessage: "Let's review the requirements",
    timestamp: "Yesterday",
  },
];

export default function Sidebar() {
  const {
    sidebarOpen,
    isCollapsed,
    toggleSidebar,
    setSidebarOpen,
    toggleCollapse,
    setCollapsed,
  } = useChatStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sidebarRef = useRef<HTMLDivElement>(null);

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
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile, setSidebarOpen]);

  return (
    <>
      {isMobile && !sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 text-zinc-100 shadow-lg md:hidden hover:scale-105 transition-transform"
          onClick={() => toggleSidebar()}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      )}

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 bg-zinc-900 text-zinc-100 shadow-lg transform transition-all duration-300 ease-in-out z-40
          ${isMobile ? "w-64" : isCollapsed ? "w-16" : "w-64"}
          ${
            isMobile
              ? sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }`}
      >
        <div className="flex h-full flex-col p-3 overflow-hidden">
          {/* Header */}
          <div
            className={`flex items-center ${
              isCollapsed && !isMobile ? "justify-center" : "justify-between"
            } pb-4 pt-2 border-b border-zinc-800`}
          >
            {(!isCollapsed || isMobile) && (
              <div className="flex items-center gap-x-3">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                {!isCollapsed && (
                  <h2 className="text-xl font-bold">Chat App</h2>
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
            className={`w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors rounded-lg flex items-center ${
              isCollapsed && !isMobile
                ? "justify-center"
                : "justify-center gap-x-2"
            }`}
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
                className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Navigation */}
          <nav className="mt-6">
            <ul className="space-y-2">
              {[
                { icon: Home, label: "Home" },
                { icon: MessageSquare, label: "Chats" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#"
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors ${
                      isCollapsed && !isMobile ? "justify-center" : "gap-x-3"
                    }`}
                  >
                    <Icon size={18} />
                    {!isCollapsed && <span>{label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recent Chats */}
          {(!isCollapsed || isMobile) && (
            <div className="mt-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Recent Chats
              </h3>
              <ul className="space-y-1">
                {fakeConversations.map((conversation) => (
                  <li
                    key={conversation.id}
                    className="px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold truncate">
                        {conversation.title}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                      {conversation.lastMessage}
                    </p>
                  </li>
                ))}
              </ul>
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
                U
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">User Name</p>
                  <p className="text-xs text-zinc-400 truncate">
                    user@example.com
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
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

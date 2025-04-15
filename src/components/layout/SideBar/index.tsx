"use client";

import { useChatStore } from "@/store/chatStore";
import { Menu, X, Search, Plus, MessageSquare, Settings, Home } from "lucide-react";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const fakeConversations = [
  {
    id: "1",
    title: "Getting started with AI",
    lastMessage: "How do I begin with machine learning?",
    timestamp: "10:30 AM"
  },
  {
    id: "2",
    title: "Project discussion",
    lastMessage: "Let's review the requirements",
    timestamp: "Yesterday"
  },
];

export default function Sidebar() {
  const {
    sidebarOpen,
    isCollapsed,
    toggleSidebar,
    setSidebarOpen,
    toggleCollapse,
    setCollapsed
  } = useChatStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Ensure sidebar is never collapsed on mobile
  useEffect(() => {
    if (isMobile && isCollapsed) {
      setCollapsed(false);
    }
  }, [isMobile, isCollapsed, setCollapsed]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isMobile && sidebarOpen && sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, sidebarOpen, setSidebarOpen]);

  // Auto-manage sidebar states based on screen size
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile, setSidebarOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && !sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white md:hidden"
          onClick={() => toggleSidebar()}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      )}


      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white transform transition-all duration-300 ease-in-out z-40
          ${isMobile ? "w-64" : isCollapsed ? "w-16" : "w-64"}
          ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}`}
      >
        <div className="flex   h-full flex-col p-2 overflow-hidden">
          {/* Header */}
          <div className={`flex items-center ${isCollapsed && !isMobile ? "justify-center" : "justify-between"} pb-4 pt-4 border-b border-gray-700`}>
            {(!isCollapsed || isMobile) && (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                {!isCollapsed && <h2 className="text-xl font-bold">Chat App</h2>}
              </div>
            )}
            {isMobile && sidebarOpen && (
              <button
                onClick={() => toggleSidebar()}
                className="p-1 rounded-md hover:bg-gray-700"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            )}
            {/* Collapse toggle - Desktop only */}
            {!isMobile && (
              <button
                onClick={toggleCollapse}
                className="p-1 rounded-md hover:bg-gray-700"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <Menu size={20} /> : <X size={20} />}
              </button>
            )}
          </div>

          {/* New Chat Button */}
          <button className={`w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center ${isCollapsed && !isMobile ? "justify-center" : "justify-center space-x-2"}`}>
            <Plus size={16} />
            {!isCollapsed && <span>New Chat</span>}
          </button>

          {/* Search Bar - Hidden when collapsed on desktop */}
          {(!isCollapsed || isMobile) && (
            <div className="mt-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Navigation Links */}
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <a href="#" className={`flex items-center px-2 py-2 text-sm rounded-md hover:bg-gray-700 ${isCollapsed && !isMobile ? "justify-center" : ""}`}>
                  <Home size={16} className={isCollapsed && !isMobile ? "" : "mr-3"} />
                  {!isCollapsed && "Home"}
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center px-2 py-2 text-sm rounded-md hover:bg-gray-700 ${isCollapsed && !isMobile ? "justify-center" : ""}`}>
                  <MessageSquare size={16} className={isCollapsed && !isMobile ? "" : "mr-3"} />
                  {!isCollapsed && "Chats"}
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center px-2 py-2 text-sm rounded-md hover:bg-gray-700 ${isCollapsed && !isMobile ? "justify-center" : ""}`}>
                  <Settings size={16} className={isCollapsed && !isMobile ? "" : "mr-3"} />
                  {!isCollapsed && "Settings"}
                </a>
              </li>
            </ul>
          </nav>

          {/* Conversation List - Hidden when collapsed on desktop */}
          {(!isCollapsed || isMobile) && (
            <div className="mt-6 flex-1 overflow-y-auto">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Recent Chats
              </h3>
              <ul className="space-y-1">
                {fakeConversations.map((conversation) => (
                  <li
                    key={conversation.id}
                    className="px-2 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium truncate">{conversation.title}</span>
                      <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{conversation.lastMessage}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* User Profile */}
          <div className={`mt-auto pt-4 border-t border-gray-700 ${isCollapsed && !isMobile ? "px-0" : "px-2"}`}>
            <div className={`flex items-center ${isCollapsed && !isMobile ? "justify-center" : "space-x-3"}`}>
              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-xs">U</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">User Name</p>
                  <p className="text-xs text-gray-400 truncate">user@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
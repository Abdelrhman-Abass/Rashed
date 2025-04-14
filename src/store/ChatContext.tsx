// context/ChatContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'

type ChatContextType = {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <ChatContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
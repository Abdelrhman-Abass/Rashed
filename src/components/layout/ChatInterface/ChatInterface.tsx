// components/ChatInterface.tsx
'use client'

import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
// import { useChat } from '@/context/ChatContext'
// import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { useChat } from '@/store/ChatContext'
import { MessageType } from '@/types/Types'
import { Send, Menu } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
// import { ChatMessage } from '../ChatMessage/ChatMessage'
import { Input } from '@/components/ui/input'
// import { Button } from './ui/button'
// import { Input } from './ui/input'
// import { Message } from './Message'

export function ChatInterface() {
  const { isSidebarOpen, toggleSidebar } = useChat()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [messages, setMessages] = useState<MessageType[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const pathname = usePathname()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: "I'm a bot response to: " + input,
        role: 'assistant',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className={cn(
      'flex-1 flex flex-col h-full',
      isMobile && isSidebarOpen ? 'hidden' : ''
    )}>
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-semibold">Chat</h1>
      </header>
      
      {/* Messages */}
      {/* <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 dark:text-gray-400">
              Start a new conversation
            </div>
          </div>
        ) : (
          messages.map((message) => (
            // <Message key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
       */}
      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
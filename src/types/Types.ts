// types/index.ts
export interface MessageType {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: string
  }
  
  export interface Chat {
    id: string
    title: string
    createdAt: string
    updatedAt: string
  }

  export interface Message {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: string;
  }


  export interface Conversation {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: string;
  }
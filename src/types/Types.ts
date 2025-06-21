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
  export interface User {
    email: string;
    id?: string; // Add other fields as needed
    userName:string;
  }
  

  // export interface Message {
  //   id: string;
  //   content: string;
  //   sender: "user" | "bot";
  //   timestamp: string;
  // }

  export interface Message {
    id: string;
    content: string;
    isFromBot: boolean;
    createdAt: string;
    type?: string; // Added for "FILE" type
    fileName?: string; // Added for filename from API response
  }


  export interface Conversation {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: string;
  }
import { create } from "zustand";

export interface Message {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: string;
  }
interface ChatState {
  messages: Message[];
  addMessage: (content: string, sender: "user" | "bot") => void;
  sidebarOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;

}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (content, sender) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Math.random().toString(),
          content,
          sender,
          timestamp: new Date().toISOString(),
        },
      ],
    })),
  sidebarOpen: false,
  isCollapsed: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  // toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  toggleCollapse: () => set((state) => {
    // Only allow collapse on desktop
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      return { isCollapsed: !state.isCollapsed };
    }
    return state;
  }),
  setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),

}));



type MessageContent = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

interface ChatStateContent {
  messages: MessageContent[];
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => void;
  uploadFile: (file: File) => void;
}

export const useChatStoreContent = create<ChatStateContent>((set, get) => ({
  messages: [],
  input: '',
  
  setInput: (input) => set({ input }),
  
  sendMessage: () => {
    const { input, messages } = get();
    if (!input.trim()) return;

    // Add user message
    const userMessage: MessageContent = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    set({ 
      messages: [...messages, userMessage],
      input: '' 
    });

    // Simulate bot response
    setTimeout(() => {
      const botMessage: MessageContent = {
        id: (Date.now() + 1).toString(),
        content: `I'm your AI assistant. You asked: "${input}"`,
        role: 'assistant',
        timestamp: new Date(),
      };
      set((state) => ({ messages: [...state.messages, botMessage] }));
    }, 1000);
  },
  
  uploadFile: (file) => {
    // Handle file upload logic
    const newMessage: MessageContent = {
      id: Date.now().toString(),
      content: `[File: ${file.name}]`,
      role: 'user',
      timestamp: new Date(),
    };
    set((state) => ({ messages: [...state.messages, newMessage] }));
  }
}));
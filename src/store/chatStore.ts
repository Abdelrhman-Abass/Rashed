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


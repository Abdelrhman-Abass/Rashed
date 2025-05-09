
import { create } from 'zustand';
import { setCookie } from 'cookies-next';
import { User } from '@/types/Types';


interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (token: string, user: User) => {
    setCookie('token', token, {
      maxAge: 432000, // 5 days
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: 'strict',
    });
    set({ token, user });
  },
  logout: async () => {
    setCookie('token', '', { maxAge: 0, path: '/' });
    set({ token: null, user: null });
  },
}));
// store/authStore.ts
// import { create } from 'zustand';
// import { setCookie } from 'cookies-next';

// interface AuthState {
//   token: string | null;
//   user: { email: string } | null;
//   login: (token: string, user: { email: string }) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   token: null,
//   user: null,
//   login: (token: string, user: { email: string }) => {
//     // Set the token in the cookie (used by the middleware)
//     setCookie('token', token, { maxAge: 86400, path: '/' }); // Expires in 1 day
//     set({ token, user });
//   },
//   logout: () => {
//     // Clear the token cookie
//     setCookie('token', '', { maxAge: 0, path: '/' });
//     set({ token: null, user: null });
//   },
// }));

import { create } from 'zustand';
import { setCookie } from 'cookies-next';

interface User {
  email: string;
  id?: string; // Add other fields as needed
}

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
      maxAge: 86400, // 1 day
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
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface AuthState {
  token: string | null;
  role: 'ADMIN' | 'REP' | null;
  userName: string | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  setAuth: (token: string, role: 'ADMIN' | 'REP', userName: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleTheme: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  userName: null,
  isAuthenticated: false,
  isDarkMode: false,

  setAuth: async (token, role, userName) => {
    // Platform check to prevent web crashes
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync('auth_token', token);
    } else {
      localStorage.setItem('auth_token', token);
    }
    
    set({ token, role, userName, isAuthenticated: true });
  },

  logout: async () => {
    // Platform check to prevent web crashes
    if (Platform.OS !== 'web') {
      await SecureStore.deleteItemAsync('auth_token');
    } else {
      localStorage.removeItem('auth_token');
    }
    
    set({ token: null, role: null, userName: null, isAuthenticated: false });
  },

  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
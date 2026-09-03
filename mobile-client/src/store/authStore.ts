import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface AuthState {
  token: string | null;
  role: 'ADMIN' | 'REP' | null;
  userName: string | null;
  profilePic: string | null; // <-- NEW
  updateProfilePic: (newUri: string) => void;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  // Updated signature to accept profilePic
  setAuth: (token: string, role: 'ADMIN' | 'REP', userName: string, profilePic?: string | null) => Promise<void>;
  logout: () => Promise<void>;
  toggleTheme: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  userName: null,
  profilePic: null,
  updateProfilePic: (newUri) => set({ profilePic: newUri }),
  isAuthenticated: false,
  isDarkMode: false,

  setAuth: async (token, role, userName, profilePic = null) => {
    // Platform check to prevent web crashes
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync('auth_token', token);
    } else {
      localStorage.setItem('auth_token', token);
    }
    
    // Save profilePic to state
    set({ token, role, userName, profilePic, isAuthenticated: true });
  },

  logout: async () => {
    // Platform check to prevent web crashes
    if (Platform.OS !== 'web') {
      await SecureStore.deleteItemAsync('auth_token');
    } else {
      localStorage.removeItem('auth_token');
    }
    
    // Clear profilePic on logout
    set({ token: null, role: null, userName: null, profilePic: null, isAuthenticated: false });
  },

  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
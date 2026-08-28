import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  token: string | null;
  role: string | null;
  setAuth: (token: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  setAuth: async (token, role) => {
    // Lock the JWT in the hardware keychain
    await SecureStore.setItemAsync('auth_token', token);
    set({ token, role });
  },
  logout: async () => {
    // Purge the token on logout
    await SecureStore.deleteItemAsync('auth_token');
    set({ token: null, role: null });
  },
}));
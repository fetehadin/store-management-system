import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Expo injects variables prefixed with EXPO_PUBLIC_ automatically
// src/api/client.ts
const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'https://tajstore-backend.onrender.com';
const BASE_URL = `${BASE_IP}/api/v1`;

// THIS IS THE SMOKING GUN: Check your mobile terminal when the app starts!
console.log("🚀 Axios API Client Initialized. Target URL:", BASE_URL);

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach the JWT token to every request if it exists
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error fetching secure token:', error);
  }
  return config;
});
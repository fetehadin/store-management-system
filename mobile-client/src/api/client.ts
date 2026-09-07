import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_IP = process.env.EXPO_PUBLIC_BASE_IP || 'http://localhost:5000';
const BASE_URL = `${BASE_IP}/api/v1`;

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
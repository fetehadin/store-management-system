import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Change this from 10.240.23.101 to your new IP
const BASE_URL = 'http://172.30.75.101:5000/api/v1';

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
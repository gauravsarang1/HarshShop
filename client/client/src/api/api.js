import axios from 'axios';

// Use the base URL directly since we have a proxy configured in vite.config.js
const BASE_URL = import.meta.env.VITE_API_URL

// Create base axios instance
const createAxiosInstance = (customConfig = {}) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    ...customConfig,
  });

  // Request interceptor for adding auth token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for handling errors
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the error is due to token expiration and we haven't tried to refresh yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh the token
          const response = await axios.post(`${BASE_URL}/users/refresh-token`, {}, {
            withCredentials: true // to include cookies
          });

          const newToken = response.data.data.accessToken;
          localStorage.setItem('token', newToken);

          // Update the failed request with new token and retry
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear token and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// API instance for JSON requests (default)
export const api = createAxiosInstance({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // to include cookies in requests
});

// API instance for multipart/form-data (file uploads)
export const uploadApi = createAxiosInstance({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true, // to include cookies in requests
});

// API instance for public routes (no auth required)
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example usage:
// For regular JSON requests (with auth):
// import { api } from '../api/api';
// await api.post('/users', userData);

// For file uploads:
// import { uploadApi } from '../api/api';
// const formData = new FormData();
// formData.append('image', file);
// await uploadApi.post('/upload', formData);

// For public routes (no auth):
// import { publicApi } from '../api/api';
// await publicApi.get('/products');

export default api;

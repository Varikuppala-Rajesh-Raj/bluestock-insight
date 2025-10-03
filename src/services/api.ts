import axios from 'axios';

// Configure your backend URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  verifyOTP: (data: { mobile: string; otp: string }) => api.post('/auth/verify-otp', data),
};

export const companyAPI = {
  create: (data: any) => api.post('/company/register', data),
  getById: (id: string) => api.get(`/company/${id}`),
  getAll: () => api.get('/companies'),
  update: (id: string, data: any) => api.put(`/company/${id}`, data),
};

export const analyticsAPI = {
  getStats: () => api.get('/analytics'),
};

export default api;

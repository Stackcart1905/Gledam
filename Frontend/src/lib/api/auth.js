// src/lib/api/auth.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';
const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, // Increase timeout to 15 seconds
  withCredentials: true, // Important for cookies
});

// Add request interceptor for debugging
client.interceptors.request.use(
  config => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
client.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API Response Error:', error.response || error.request || error.message);
    return Promise.reject(error);
  }
);

// Signup
export const signup = async (userData) => {
  try {
    const { data } = await client.post('/api/auth/signup', userData);
    return data;
  } catch (error) {
    console.error('API signup error:', error);
    throw error;
  }
};

// Signin
export const signin = async (credentials) => {
  try {
    const { data } = await client.post('/api/auth/signin', credentials);
    return data;
  } catch (error) {
    console.error('API signin error:', error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  const { data } = await client.post('/api/auth/logout');
  return data;
};

// Check if user is authenticated
export const checkAuth = async () => {
  const { data } = await client.get('/api/auth/checkAuth');
  return data;
};

// Verify OTP
export const verifyOtp = async (otpData) => {
  const { data } = await client.post('/api/auth/verify-otp', otpData);
  return data;
};

// Resend OTP
export const resendOtp = async (email) => {
  const { data } = await client.post('/api/auth/resend-otp', { email });
  return data;
};

// Forget Password
export const forgetPassword = async (email) => {
  const { data } = await client.post('/api/auth/forgetPassword', { email });
  return data;
};

// Reset Password
export const resetPassword = async (resetData) => {
  const { data } = await client.post('/api/auth/resetPassword', resetData);
  return data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const { data } = await client.post('/api/auth/change-password', passwordData);
  return data;
};
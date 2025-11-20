// src/lib/api/orders.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';
const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
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

// Create order from cart
export const createOrder = async (userId, orderData) => {
  try {
    const { data } = await client.post(`/api/orders/${userId}/create`, orderData);
    return data;
  } catch (error) {
    console.error('API create order error:', error);
    throw error;
  }
};

// Get user orders
export const getUserOrders = async (userId) => {
  try {
    const { data } = await client.get(`/api/orders/${userId}`);
    return data;
  } catch (error) {
    console.error('API get user orders error:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const { data } = await client.get(`/api/orders/order/${orderId}`);
    return data;
  } catch (error) {
    console.error('API get order by ID error:', error);
    throw error;
  }
};

// Verify payment
export const verifyPayment = async (paymentData) => {
  try {
    const { data } = await client.post(`/api/orders/verify-payment`, paymentData);
    return data;
  } catch (error) {
    console.error('API verify payment error:', error);
    throw error;
  }
};
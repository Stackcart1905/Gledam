// src/lib/api/products.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';
const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true, // Important for cookies
});

export const fetchProducts = async () => {
  const { data } = await client.get('/api/products');
  return data;
};

export const searchProducts = async (query) => {
  const { data } = await client.get(`/api/products?search=${encodeURIComponent(query)}`);
  return data;
};

export const fetchAnalytics = async () => {
  const { data } = await client.get('/api/products/analytics/all');
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await client.post('/api/products', payload);
  return data;
};

export const patchProduct = async (id, payload) => {
  const { data } = await client.put(`/api/products/${id}`, payload);
  return data;
};

export const removeProduct = async (id) => {
  const { data } = await client.delete(`/api/products/${id}`);
  return data;
};
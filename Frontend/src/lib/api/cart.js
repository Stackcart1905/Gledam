// src/lib/api/cart.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';
const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
  withCredentials: true, // Important for cookies
});

// Add product to cart
export const addToCart = async (userId, productId, quantity = 1) => {
  const { data } = await client.post(`/api/cart/${userId}/add`, { productId, quantity });
  return data;
};

// Get user's cart
export const getCart = async (userId) => {
  const { data } = await client.get(`/api/cart/${userId}`);
  return data;
};

// Update cart item quantity
export const updateCartItem = async (userId, productId, quantity) => {
  const { data } = await client.put(`/api/cart/${userId}/update/${productId}`, { quantity });
  return data;
};

// Remove item from cart
export const removeFromCart = async (userId, productId) => {
  const { data } = await client.delete(`/api/cart/${userId}/remove/${productId}`);
  return data;
};

// Apply coupon
export const applyCoupon = async (userId, couponCode, discountAmount) => {
  const { data } = await client.post(`/api/cart/${userId}/apply-coupon`, { couponCode, discountAmount });
  return data;
};

// Clear cart
export const clearCart = async (userId) => {
  const { data } = await client.delete(`/api/cart/${userId}/clear`);
  return data;
};
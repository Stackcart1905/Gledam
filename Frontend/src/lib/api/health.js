// src/lib/api/health.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/health`, {
      timeout: 5000,
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Backend health check failed:', error);
    throw error;
  }
};
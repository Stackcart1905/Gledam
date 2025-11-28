// src/lib/api/blogs.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

// Create a client without default Content-Type header for file uploads
const client = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  withCredentials: true,
});

// For JSON requests, we'll set the content type explicitly
const jsonClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
  withCredentials: true,
});

// Get all blogs
export const fetchBlogs = async () => {
  const { data } = await jsonClient.get('/api/blog');
  return data;
};

// Get blog by ID
export const fetchBlogById = async (id) => {
  const { data } = await jsonClient.get(`/api/blog/${id}`);
  return data;
};

// Create a new blog post
export const createBlog = async (blogData) => {
  // For FormData, let the browser set the content type automatically
  const config = blogData instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } };
  const { data } = await client.post('/api/blog', blogData, config);
  return data;
};

// Update a blog post
export const updateBlog = async (id, blogData) => {
  // For FormData, let the browser set the content type automatically
  const config = blogData instanceof FormData ? {} : { headers: { 'Content-Type': 'application/json' } };
  const { data } = await client.patch(`/api/blog/${id}`, blogData, config);
  return data;
};

// Delete a blog post
export const deleteBlog = async (id) => {
  const { data } = await jsonClient.delete(`/api/blog/${id}`);
  return data;
};
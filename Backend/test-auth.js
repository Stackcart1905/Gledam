// Simple test script to verify backend authentication
import axios from 'axios';

const API_BASE = 'http://localhost:5001';

async function testAuth() {
  try {
    // Test health check
    console.log('Testing health check...');
    const healthResponse = await axios.get(`${API_BASE}/api/health`);
    console.log('Health check response:', healthResponse.data);
    
    // Test signup
    console.log('\nTesting signup...');
    const signupResponse = await axios.post(`${API_BASE}/api/auth/signup`, {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Signup response:', signupResponse.data);
    
    // Test signin
    console.log('\nTesting signin...');
    const signinResponse = await axios.post(`${API_BASE}/api/auth/signin`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Signin response:', signinResponse.data);
    
    // Test checkAuth (with cookies)
    console.log('\nTesting checkAuth...');
    const checkAuthResponse = await axios.get(`${API_BASE}/api/auth/checkAuth`, {
      withCredentials: true
    });
    console.log('CheckAuth response:', checkAuthResponse.data);
    
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

testAuth();
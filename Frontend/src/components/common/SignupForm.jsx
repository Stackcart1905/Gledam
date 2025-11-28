// src/components/common/SignupForm.jsx
import React, { useState } from 'react';
import * as authService from '@/lib/api/auth';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await authService.signup(formData);
      if (response.success) {
        setMessage(response.message || 'Signup successful! Please check your email for verification.');
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      
      {message && <div className="mt-4 p-2 bg-green-800 text-green-200 rounded">{message}</div>}
      {error && <div className="mt-4 p-2 bg-red-800 text-red-200 rounded">{error}</div>}
    </div>
  );
};

export default SignupForm;
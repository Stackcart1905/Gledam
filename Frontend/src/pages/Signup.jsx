import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await signup(formData);
      if (response.success) {
        // Redirect to verify email page with success message
        navigate('/verify-email', { 
          state: { 
            email: formData.email,
            message: response.message || 'Account created successfully! Please check your email for verification.' 
          } 
        });
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      if (err.response && err.response.data) {
        console.error('Server response error:', err.response);
        setError(err.response.data.message || 'Signup failed: ' + err.response.statusText);
      } else if (err.request) {
        console.error('Network request error:', err.request);
        setError('Network error. Please check your connection and try again.');
      } else {
        console.error('Unexpected error:', err.message);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button 
            type="submit" 
            className="mt-2 bg-green-600 px-4 py-2 rounded font-semibold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm text-green-400 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}
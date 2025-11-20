import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Attempting login with:', { email, password });
      const response = await login({ email, password });
      console.log('Login response:', response);
      if (response.success) {
        // Redirect to admin dashboard or intended page
        const from = location.state?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data) {
        console.error('Server response error:', err.response.data);
        setError(err.response.data.message || 'Login failed: ' + err.response.data.error || err.response.statusText);
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
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button 
            type="submit" 
            className="mt-2 bg-green-600 px-4 py-2 rounded font-semibold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-green-400 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
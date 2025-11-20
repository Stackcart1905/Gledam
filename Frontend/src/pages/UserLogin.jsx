import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UserLogin() {
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
      const response = await login({ email, password });
      if (response.success) {
        // Redirect to home page or intended page
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4">User Login</h1>
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
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate('/signup')}
            className="text-sm text-green-400 hover:underline"
          >
            Don't have an account? Sign up
          </button>
        </div>
        <div className="mt-2 text-center">
          <button 
            onClick={() => navigate('/admin-login')}
            className="text-sm text-gray-400 hover:underline"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '@/lib/api/auth';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await authService.forgetPassword(email);
      if (response.success) {
        setMessage(response.message || 'OTP sent to your email. Please check your inbox.');
        // Redirect to reset password page after a short delay
        setTimeout(() => {
          navigate('/reset-password', { state: { email } });
        }, 2000);
      } else {
        setError(response.message || 'Failed to send reset instructions');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to send reset instructions');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
        <p className="text-sm text-gray-300 mb-4">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          
          {error && <div className="text-red-400 text-sm">{error}</div>}
          {message && <div className="text-green-400 text-sm">{message}</div>}
          
          <button 
            type="submit" 
            className="mt-2 bg-green-600 px-4 py-2 rounded font-semibold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm text-green-400 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
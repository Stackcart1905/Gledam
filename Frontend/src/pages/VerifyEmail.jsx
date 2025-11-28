import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as authService from '@/lib/api/auth';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pre-fill email from signup page if available
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await authService.verifyOtp({ email, otp });
      if (response.success) {
        setMessage(response.message || 'Email verified successfully!');
        // Redirect to login page after successful verification
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'Verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during verification');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await authService.resendOtp(email);
      if (response.success) {
        setMessage(response.message || 'OTP resent successfully. Please check your email.');
      } else {
        setError(response.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while resending OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4">Verify Email</h1>
        <form onSubmit={verifyOtp} className="flex flex-col gap-3">
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
            placeholder="OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            required
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          {message && <div className="text-green-400 text-sm">{message}</div>}
          <button 
            type="submit" 
            className="mt-2 bg-green-600 px-4 py-2 rounded font-semibold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={resendOtp}
            className="text-sm text-green-400 hover:underline"
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>
        <div className="mt-2 text-center">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm text-gray-400 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
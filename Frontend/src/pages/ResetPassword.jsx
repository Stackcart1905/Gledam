import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as authService from '@/lib/api/auth';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate password strength
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await authService.resetPassword({
        email,
        otp,
        newPassword
      });
      
      if (response.success) {
        setMessage('Password reset successful! Redirecting to login...');
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to reset password');
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
        <h1 className="text-xl font-bold mb-4">Reset Password</h1>
        <p className="text-sm text-gray-300 mb-4">
          Enter the OTP sent to your email and your new password.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {!location.state?.email && (
            <input
              className="bg-black/40 border border-white/10 rounded px-3 py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          )}
          
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            required
          />
          
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          {error && <div className="text-red-400 text-sm">{error}</div>}
          {message && <div className="text-green-400 text-sm">{message}</div>}
          
          <button 
            type="submit" 
            className="mt-2 bg-green-600 px-4 py-2 rounded font-semibold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-green-400 hover:underline"
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
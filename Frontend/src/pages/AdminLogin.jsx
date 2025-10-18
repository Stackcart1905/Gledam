import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    // Dummy admin login; replace with backend call later
    if (username && password) {
      loginAs('admin', { username });
      navigate('/admin');
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <input
            className="bg-black/40 border border-white/10 rounded px-3 py-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button type="submit" className="mt-2 bg-green-600 px-4 py-2 rounded font-semibold">Login</button>
        </form>
      </div>
    </div>
  );
}

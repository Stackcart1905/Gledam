// src/pages/AuthTest.jsx
import React from 'react';
import ConnectionTest from '@/components/common/ConnectionTest';
import SignupForm from '@/components/common/SignupForm';
import LoginForm from '@/components/common/LoginForm';
import UserProfile from '@/components/common/UserProfile';
import { useAuth } from '@/lib/auth/AuthContext';

const AuthTest = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Authentication Test</h1>
        
        <div className="mb-8">
          <ConnectionTest />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {!isLoggedIn ? (
            <>
              <div>
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>
                <SignupForm />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <LoginForm />
              </div>
            </>
          ) : (
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">User Profile</h2>
              <UserProfile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTest;
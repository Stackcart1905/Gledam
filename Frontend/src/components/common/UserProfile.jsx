// src/components/common/UserProfile.jsx
import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';

const UserProfile = () => {
  const { user, logout, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg">
        <p>You are not logged in</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button
          onClick={logout}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
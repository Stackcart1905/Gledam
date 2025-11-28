import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '@/lib/api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    isLoggedIn: false,
    role: null,
    user: null,
    loading: true
  });

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await authService.checkAuth();
        if (response.success) {
          setState({
            isLoggedIn: true,
            role: response.user.role,
            user: response.user,
            loading: false
          });
        } else {
          setState({
            isLoggedIn: false,
            role: null,
            user: null,
            loading: false
          });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setState({
          isLoggedIn: false,
          role: null,
          user: null,
          loading: false
        });
      }
    };

    checkAuthentication();
  }, []);

  const login = async (credentials) => {
    try {
      console.log('AuthService signin called with:', credentials);
      const response = await authService.signin(credentials);
      console.log('AuthService signin response:', response);
      if (response.success) {
        setState({
          isLoggedIn: true,
          role: response.role,
          user: {
            _id: response._id,
            fullName: response.fullName,
            email: response.email
          },
          loading: false
        });
        return { success: true };
      } else {
        return { success: false, message: response.message || response.error };
      }
    } catch (error) {
      console.error('Login error in service:', error);
      if (error.response && error.response.data) {
        console.error('Server response error:', error.response.data);
        return { success: false, message: error.response.data.message || error.response.data.error || 'Login failed' };
      } else if (error.request) {
        console.error('Network request error:', error.request);
        return { success: false, message: 'Network error. Please check your connection and try again.' };
      } else {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
      }
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authService.signup(userData);
      return response;
    } catch (error) {
      console.error('Signup error in context:', error);
      if (error.response && error.response.data) {
        console.error('Server response error:', error.response);
        return { success: false, message: error.response.data.message || 'Signup failed: ' + error.response.statusText };
      } else if (error.request) {
        console.error('Network request error:', error.request);
        return { success: false, message: 'Network error. Please check your connection and try again.' };
      } else {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
      }
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setState({
        isLoggedIn: false,
        role: null,
        user: null,
        loading: false
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if backend fails, clear local state
      setState({
        isLoggedIn: false,
        role: null,
        user: null,
        loading: false
      });
    }
  };

  const value = useMemo(() => ({
    ...state,
    login,
    signup,
    logout
  }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

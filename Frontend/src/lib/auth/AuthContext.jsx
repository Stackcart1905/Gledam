import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const KEY = 'gledam.auth';
const AuthContext = createContext(null);

function readAuth() {
  if (typeof window === 'undefined') return { isLoggedIn: false, role: null, user: null };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { isLoggedIn: false, role: null, user: null };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {}
  return { isLoggedIn: false, role: null, user: null };
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(readAuth);

  useEffect(() => {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const value = useMemo(() => ({
    ...state,
    loginAs: (role, user = null) => setState({ isLoggedIn: true, role, user }),
    logout: () => setState({ isLoggedIn: false, role: null, user: null }),
  }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

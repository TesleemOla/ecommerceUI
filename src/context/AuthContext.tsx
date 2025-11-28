// src/contexts/AuthContext.tsx (New File Example)
'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the context data
interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  isLoading: boolean;
  login: (accessToken: string, user: { role?: string }) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start in a loading state

  useEffect(() => {
    // Check session on initial load
    const checkSession = async () => {
      try {
        const response = await fetch('/api/session');
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
        setRole(data.role);
      } catch (error) {
        console.error('Failed to fetch session', error);
        setIsAuthenticated(false);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []); // Empty dependency array means this runs once on mount

  const login = async (accessToken: string, user: { role?: string }) => {
    await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, user }),
    });
    setIsAuthenticated(true);
    setRole(user.role ?? null);
  };

  const logout = async () => {
    await fetch('/api/session', { method: 'DELETE' });
    setIsAuthenticated(false);
    setRole(null);
  };

  const value = { isAuthenticated, role, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Create a custom hook for easy consumption
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

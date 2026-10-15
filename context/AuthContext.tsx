import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role, AuthState, LoginCredentials, RegisterData } from '@/types/user';
import { MOCK_USERS } from '@/data/mockData';
import { STORAGE_KEYS } from '@/utils/storage';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const restoreSession = async () => {
    try {
      const { getItem } = await import('@/utils/storage');
      const session = await getItem(STORAGE_KEYS.SESSION);
      if (session) {
        setState({
          user: session.user,
          role: session.role,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }));

    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = Object.values(MOCK_USERS).find(
      u => u.email === credentials.email && u.role === credentials.role
    );

    if (!mockUser) {
      throw new Error('Invalid credentials');
    }

    const session = { user: mockUser, role: credentials.role };
    const { setItem } = await import('@/utils/storage');
    await setItem(STORAGE_KEYS.SESSION, session);

    setState({
      user: mockUser,
      role: credentials.role,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  const register = async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `${data.role}_${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      phone: data.phone,
      createdAt: new Date(),
    };

    MOCK_USERS[newUser.id] = newUser;

    const session = { user: newUser, role: data.role };
    const { setItem } = await import('@/utils/storage');
    await setItem(STORAGE_KEYS.SESSION, session);

    setState({
      user: newUser,
      role: data.role,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  const logout = async () => {
    const { removeItem } = await import('@/utils/storage');
    await removeItem(STORAGE_KEYS.SESSION);
    const { clearCart } = await import('@/utils/storage');
    await clearCart();

    setState({
      user: null,
      role: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
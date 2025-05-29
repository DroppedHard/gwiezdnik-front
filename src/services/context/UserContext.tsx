import { UseMutateFunction } from '@tanstack/react-query';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLogin, useRegister, useRestoreSession } from 'services/hooks';
import type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  UserResponse,
  User,
} from 'utils/types';

interface UserContextValue {
  user: User | null;
  login: UseMutateFunction<LoginResponse, Error, LoginCredentials, unknown>;
  register: UseMutateFunction<UserResponse, Error, RegisterCredentials, unknown>;
  logout: () => boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = useLogin(setUser);
  const register = useRegister();
  const restore = useRestoreSession(setUser);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    return true;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    const refreshToken = localStorage.getItem('refresh-token');

    if (accessToken && refreshToken) {
      restore.mutate();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login: login.mutate, logout, register: register.mutate }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

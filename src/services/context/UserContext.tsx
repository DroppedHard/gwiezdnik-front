import { UseMutateFunction } from '@tanstack/react-query';
import { createContext, useContext, useState, ReactNode } from 'react';
import { useLogin } from 'services/hooks';
import type { LoginCredentials, LoginResponse, User } from 'utils/types';

interface UserContextValue {
  user: User | null;
  login: UseMutateFunction<LoginResponse, Error, LoginCredentials, unknown>;
  register: (userData: User) => boolean;
  logout: () => boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = useLogin(setUser);

  const logout = () => {
    setUser(null);
    // Optionally: clear storage
    return true;
  };

  const register = (userData: User) => {
    setUser(userData);
    console.log(userData);
    return true;
  };

  return (
    <UserContext.Provider value={{ user, login: login.mutate, logout, register }}>
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

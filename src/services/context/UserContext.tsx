import { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from 'utils/types';

interface UserContextValue {
  user: User | null;
  login: (userData: User) => boolean;
  register: (userData: User) => boolean;
  logout: () => boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser({ ...userData, username: 'Tester' });
    console.log(userData);
    // TODO save in local storage
    // Optionally: store in localStorage/sessionStorage/cookie
    return true;
  };

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
    <UserContext.Provider value={{ user, login, logout, register }}>
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

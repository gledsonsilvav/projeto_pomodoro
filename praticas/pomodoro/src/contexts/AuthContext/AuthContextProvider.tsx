import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import { validateLogin } from '../../utils/validateLogin';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('@chronos:authenticated') === 'true';
  });

  function login(username: string, password: string) {
    const isValid = validateLogin(username, password);

    if (!isValid) return false;

    sessionStorage.setItem('@chronos:authenticated', 'true');
    setIsAuthenticated(true);

    return true;
  }

  function logout() {
    sessionStorage.removeItem('@chronos:authenticated');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
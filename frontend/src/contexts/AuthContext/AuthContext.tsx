import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { apiFetch } from '../../services/api';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    email: string,
    password: string,
  ) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;

  logout: () => void;
};

const AuthContext =
  createContext({} as AuthContextType);

export function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken =
      localStorage.getItem(
        '@pomodoro:token',
      );

    const storedUser =
      localStorage.getItem(
        '@pomodoro:user',
      );

    if (storedToken && storedUser) {
      setToken(storedToken);

      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  async function login(
    email: string,
    password: string,
  ) {
    const data = await apiFetch(
      '/auth/login',
      {
        method: 'POST',

        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    localStorage.setItem(
      '@pomodoro:token',
      data.token,
    );

    localStorage.setItem(
      '@pomodoro:user',
      JSON.stringify(data.user),
    );

    setToken(data.token);

    setUser(data.user);
  }

  async function register(
    name: string,
    email: string,
    password: string,
  ) {
    await apiFetch('/auth/register', {
      method: 'POST',

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  function logout() {
    localStorage.removeItem(
      '@pomodoro:token',
    );

    localStorage.removeItem(
      '@pomodoro:user',
    );

    setToken(null);

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
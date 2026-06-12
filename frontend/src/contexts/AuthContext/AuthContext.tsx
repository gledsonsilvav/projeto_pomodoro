import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

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
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

const TEST_USER = {
  id: 1,
  name: 'Pomodoro',
  email: 'pomodoro@teste.com',
};

const TEST_PASSWORD = '123456';
const TEST_TOKEN = 'mock-token-pomodoro';

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem('@pomodoro:token');
    const storedUser = localStorage.getItem('@pomodoro:user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    if (email !== TEST_USER.email || password !== TEST_PASSWORD) {
      throw new Error('Email ou senha inválidos');
    }

    localStorage.setItem('@pomodoro:token', TEST_TOKEN);
    localStorage.setItem('@pomodoro:user', JSON.stringify(TEST_USER));

    setToken(TEST_TOKEN);
    setUser(TEST_USER);
  }

  async function register(name: string, email: string, password: string) {
    const newUser = {
      id: 2,
      name,
      email,
    };

    localStorage.setItem('@pomodoro:token', TEST_TOKEN);
    localStorage.setItem('@pomodoro:user', JSON.stringify(newUser));

    setToken(TEST_TOKEN);
    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem('@pomodoro:token');
    localStorage.removeItem('@pomodoro:user');

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
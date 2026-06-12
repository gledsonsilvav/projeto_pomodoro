import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface ThemeContextType {
  theme: 'dark' | 'light';

  toggleTheme: () => void;
}

export const ThemeContext =
  createContext({} as ThemeContextType);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<
    'dark' | 'light'
  >(() => {
    const storedTheme =
      localStorage.getItem(
        '@chronos:theme-1.0.0',
      );

    return (
      (storedTheme as 'dark' | 'light') ||
      'dark'
    );
  });

  function toggleTheme() {
    setTheme((prev) =>
      prev === 'dark'
        ? 'light'
        : 'dark',
    );
  }

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme,
    );

    localStorage.setItem(
      '@chronos:theme-1.0.0',
      theme,
    );
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,

        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
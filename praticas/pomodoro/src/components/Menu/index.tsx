import { useEffect, useState } from 'react';

import {
  House,
  ClockCounterClockwise,
  Gear,
  Moon,
  Sun,
} from 'phosphor-react';

import { RouterLink } from '../RouterLink';

import styles from './styles.module.css';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const savedTheme = localStorage.getItem(
      '@chronos:theme',
    ) as AvailableThemes | null;

    return savedTheme === 'light'
      ? 'light'
      : 'dark';
  });

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault();

    setTheme((prevTheme) =>
      prevTheme === 'dark'
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
      '@chronos:theme',
      theme,
    );
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink
        href="/"
        title="Ir para Home"
        aria-label="Ir para Home"
      >
        <House size={22} />
      </RouterLink>

      <RouterLink
        href="/history/"
        title="Ver Histórico"
        aria-label="Ver Histórico"
      >
        <ClockCounterClockwise size={22} />
      </RouterLink>

      <RouterLink
        href="/settings/"
        title="Configurações"
        aria-label="Configurações"
      >
        <Gear size={22} />
      </RouterLink>

      <a
        href="#"
        title="Mudar tema"
        aria-label="Mudar tema"
        onClick={handleThemeChange}
      >
        {theme === 'dark' ? (
          <Sun size={22} />
        ) : (
          <Moon size={22} />
        )}
      </a>
    </nav>
  );
}
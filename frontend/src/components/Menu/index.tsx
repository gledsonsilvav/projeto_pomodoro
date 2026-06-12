import { useState } from 'react';

import { useNavigate } from 'react-router';

import {
  House,
  ClockCounterClockwise,
  Gear,
  Moon,
  SignOut,
  Sun,
} from 'phosphor-react';

import { RouterLink } from '../RouterLink';

import { useAuth } from '../../contexts/AuthContext/AuthContext';

import styles from './styles.module.css';

type AvailableThemes = 'dark' | 'light';

function getInitialTheme(): AvailableThemes {
  const savedTheme = localStorage.getItem('@chronos:theme');

  if (savedTheme === 'dark' || savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', savedTheme);
    return savedTheme;
  }

  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('@chronos:theme', 'dark');

  return 'dark';
}

export function Menu() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const [theme, setTheme] = useState<AvailableThemes>(getInitialTheme);

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault();

    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('@chronos:theme', newTheme);

      return newTheme;
    });
  }

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  return (
    <nav className={styles.menu}>
      <RouterLink href="/home/" title="Ir para Home" aria-label="Ir para Home">
        <House size={22} />
      </RouterLink>

      <RouterLink href="/history/" title="Ver Histórico" aria-label="Ver Histórico">
        <ClockCounterClockwise size={22} />
      </RouterLink>

      <RouterLink href="/settings/" title="Configurações" aria-label="Configurações">
        <Gear size={22} />
      </RouterLink>

      <a href="#" title="Mudar tema" aria-label="Mudar tema" onClick={handleThemeChange}>
        {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
      </a>

      <button type="button" title="Sair" aria-label="Sair" onClick={handleLogout}>
        <SignOut size={22} />
      </button>
    </nav>
  );
}
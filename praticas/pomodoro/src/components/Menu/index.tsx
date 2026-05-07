import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  // 1. Inicialização preguiçosa (Lazy Initialization)
  // Busca o tema salvo no navegador assim que o componente nasce
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes;
    return storageTheme || 'dark'; // Se não houver nada salvo, o padrão é dark
  });

  // 2. Dicionário de ícones
  // Evita o uso de vários if/else dentro do HTML (JSX)
  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  // 3. Efeito Colateral Único
  // Toda vez que o tema mudar, ele atualiza o HTML e salva a preferência
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a className={styles.menuLink} href='#' aria-label='Home' title='Home'>
        <HouseIcon />
      </a>

      <a className={styles.menuLink} href='#' aria-label='Histórico' title='Histórico'>
        <HistoryIcon />
      </a>

      <a className={styles.menuLink} href='#' aria-label='Configurações' title='Configurações'>
        <SettingsIcon />
      </a>

      <a
        className={styles.menuLink}
        href='#'
        aria-label='Mudar Tema'
        title='Mudar Tema'
        onClick={handleThemeChange}
      >
        {/* Renderiza o ícone do dicionário baseado no estado atual */}
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
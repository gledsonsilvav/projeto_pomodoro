import { RouterLink } from '../RouterLink';

import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href="/about-pomodoro/">
        Entenda como funciona a técnica pomodoro
      </RouterLink>

      <RouterLink href="/home/">
        Chronos Pomodoro © {new Date().getFullYear()} - Feito por Gledson
      </RouterLink>
    </footer>
  );
}
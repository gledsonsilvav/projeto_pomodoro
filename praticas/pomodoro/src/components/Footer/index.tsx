import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href='#'>Entenda como funciona a técnica pomodoro</a>
      <a href='#'>
        {/* O &copy; vira o símbolo © e o JS pega o ano atual (2026) */}
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </a>
    </footer>
  );
}
import { useEffect } from 'react';

import { RouterLink } from '../../components/RouterLink';

import styles from './styles.module.css';

export function NotFound() {
  useEffect(() => {
    document.title =
      'Página não encontrada - Chronos Pomodoro';
  }, []);

  return (
    <main className={styles.container}>
      <h1>404 🚀</h1>

      <p>
        Opa! Parece que essa página não existe.
      </p>

      <p>
        Você pode voltar para a{' '}
        <RouterLink href="/">
          página principal
        </RouterLink>
        .
      </p>
    </main>
  );
}
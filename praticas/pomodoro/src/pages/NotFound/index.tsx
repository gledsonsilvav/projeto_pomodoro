import { useEffect } from 'react';

import { WarningCircle } from 'phosphor-react';

import { RouterLink } from '../../components/RouterLink';

import { MainTemplate } from '../../templates/MainTemplate';

import styles from './styles.module.css';

export function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <main className={styles.container}>
        <WarningCircle
          size={72}
          weight="fill"
          className={styles.icon}
        />

        <h1>Página não encontrada</h1>

        <p>
          A página que você tentou acessar não existe ou foi removida.
        </p>

        <RouterLink href="/home/" className={styles.backLink}>
          Voltar para Home
        </RouterLink>
      </main>
    </MainTemplate>
  );
}
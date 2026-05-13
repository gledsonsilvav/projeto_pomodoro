import { useEffect } from 'react';

import { RouterLink } from '../../components/RouterLink';

import { MainTemplate } from '../../templates/MainTemplate';

import styles from './styles.module.css';

export function AboutPomodoro() {
  useEffect(() => {
    document.title = 'Sobre Pomodoro - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <main className={styles.container}>
        <h1>Sobre a técnica Pomodoro</h1>

        <p>
          A técnica Pomodoro é um método de gerenciamento de tempo criado para
          aumentar o foco e a produtividade durante as atividades do dia a dia.
        </p>

        <p>
          O método funciona alternando períodos de concentração intensa com
          pequenas pausas estratégicas.
        </p>

        <p>
          Normalmente, utiliza-se:
        </p>

        <ul>
          <li>25 minutos de foco;</li>
          <li>5 minutos de descanso curto;</li>
          <li>
            descanso longo após alguns ciclos completos.
          </li>
        </ul>

        <p>
          O objetivo é manter a mente descansada e melhorar o rendimento sem
          gerar fadiga excessiva.
        </p>

        <RouterLink href="/home/" className={styles.backLink}>
          Voltar para Home
        </RouterLink>
      </main>
    </MainTemplate>
  );
}
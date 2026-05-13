import { useEffect } from 'react';

import { RouterLink } from '../../components/RouterLink';

import styles from './styles.module.css';

export function AboutPomodoro() {
  useEffect(() => {
    document.title =
      'Entenda a Técnica Pomodoro - Chronos Pomodoro';
  }, []);

  return (
    <main className={styles.container}>
      <h1>A Técnica Pomodoro 🍅</h1>

      <p>
        A técnica Pomodoro é um método de gerenciamento de tempo baseado em
        ciclos de foco e descanso.
      </p>

      <p>
        Você trabalha totalmente focado durante um período e depois realiza
        pausas curtas para recuperar energia.
      </p>

      <p>
        O Chronos ajuda você a organizar tarefas, manter consistência e melhorar
        produtividade.
      </p>

      <p>
        <strong>
          Pronto pra focar?
        </strong>{' '}
        <RouterLink href="/">
          Voltar para a página inicial
        </RouterLink>
      </p>
    </main>
  );
}
// src/components/Container.tsx
import { type ReactNode } from 'react';
import styles from './styles.module.css';

interface ContainerProps {
  children: ReactNode; // Aceita qualquer conteúdo JSX
}

export function Container({ children }: ContainerProps) {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}
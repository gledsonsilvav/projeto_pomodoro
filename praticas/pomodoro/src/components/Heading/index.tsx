// src/components/Heading.tsx
import React from 'react'; 
import styles from './styles.module.css';

// 1. Definimos o "contrato" (Interface ou Type)
type HeadingProps = {
  children: React.ReactNode; // Aceita texto, HTML e ícones
};

// 2. Usamos a DESESTRUTURAÇÃO { children } para o código ficar limpo
export function Heading({ children }: HeadingProps) {
  return (
    <header className={styles.container}>
      <h1 className={styles.heading}>
        {children}
      </h1>
    </header>
  );
}
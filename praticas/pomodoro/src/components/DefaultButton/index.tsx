import React from 'react';
import styles from './styles.module.css';

type DefaultButtonProps = {
  icon: React.ReactNode; 
  color?: 'green' | 'red'; // Union Type: aceita apenas estas duas opções
} & React.ComponentProps<'button'>;

export function DefaultButton({
  icon,
  color = 'green', // Valor padrão caso não seja enviado nada
  ...props
}: DefaultButtonProps) {
  return (
    /* A mágica styles[color] acessa .green ou .red dinamicamente */
    <button className={`${styles.button} ${styles[color]}`} {...props}>
      {icon}
    </button>
  );
}
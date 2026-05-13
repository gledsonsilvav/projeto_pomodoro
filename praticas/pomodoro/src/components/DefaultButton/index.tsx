import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  color?: 'red';
}

export function DefaultButton({ icon, color, ...rest }: DefaultButtonProps) {
  return (
    <button 
      className={`${styles.defaultButton} ${color === 'red' ? styles.red : ''}`} 
      {...rest}
    >
      {icon}
    </button>
  );
}
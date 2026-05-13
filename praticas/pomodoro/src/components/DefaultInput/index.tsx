import type { ComponentProps } from 'react';
import styles from './styles.module.css';

type DefaultInputProps = {
  id: string;
  labelText: string;
} & ComponentProps<'input'>;

export function DefaultInput({
  id,
  type,
  labelText,
  ...rest
}: DefaultInputProps) {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {labelText}
      </label>
      <input 
        className={styles.input} // Aplicando a classe do CSS Module
        id={id} 
        type={type} 
        {...rest} 
      />
    </>
  );
}
import React from 'react';
import styles from './styles.module.css'; // 1. Importe aqui!

type DefaultInputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({ id, type, labelText, ...rest }: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      {/* 2. Aplique a className aqui */}
      <input className={styles.input} id={id} type={type} {...rest} />
    </>
  );
}
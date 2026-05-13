import { Timer } from 'phosphor-react';

import { RouterLink } from '../RouterLink';

import styles from './styles.module.css';

export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink
        href="/"
        className={styles.logoLink}
      >
        <Timer size={38} weight="fill" />

        <span>Chronos</span>
      </RouterLink>
    </div>
  );
}
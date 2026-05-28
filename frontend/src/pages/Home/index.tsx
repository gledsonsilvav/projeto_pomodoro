import { useEffect } from 'react';

import { Countdown } from '../../components/countdown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../templates/MainTemplate';

import { useAuth } from '../../contexts/AuthContext/AuthContext';

import styles from './styles.module.css';

export function Home() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <section className={styles.content}>
        <p
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          Bem-vindo, {user?.name || user?.email}
        </p>

        <Countdown />

        <MainForm />
      </section>
    </MainTemplate>
  );
}
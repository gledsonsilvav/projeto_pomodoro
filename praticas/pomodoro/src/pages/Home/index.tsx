import { useEffect } from 'react';

import { Countdown } from '../../components/countdown';

import { MainForm } from '../../components/MainForm';

import { MainTemplate } from '../../templates/MainTemplate';

import styles from './styles.module.css';

export function Home() {
  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <section className={styles.content}>
        <Countdown />

        <MainForm />
      </section>
    </MainTemplate>
  );
}
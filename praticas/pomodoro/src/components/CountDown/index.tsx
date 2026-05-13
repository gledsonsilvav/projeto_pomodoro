import { useContext, useEffect } from 'react';

import { TaskContext } from '../../contexts/TaskContext/TaskContextProvider';

import styles from './styles.module.css';

export function Countdown() {
  const { state } = useContext(TaskContext);

  const totalSeconds = state.activeTask
    ? state.activeTask.secondsRemaining
    : 0;

  const minutesAmount = Math.floor(totalSeconds / 60);
  const secondsAmount = totalSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (state.activeTask) {
      document.title = `${minutes}:${seconds}`;
    } else {
      document.title = 'Chronos Pomodoro';
    }
  }, [minutes, seconds, state.activeTask]);

  return (
    <div className={styles.countdown}>
      {minutes}:{seconds}
    </div>
  );
}
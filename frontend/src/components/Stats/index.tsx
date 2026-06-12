import { useContext } from 'react';

import { TaskContext } from '../../contexts/TaskContext/TaskContextProvider';

import styles from './styles.module.css';

export function Stats() {
  const { state } = useContext(TaskContext);

  const completedTasks =
    state.tasks.filter(
      (task) => task.completeDate,
    ).length;

  const interruptedTasks =
    state.tasks.filter(
      (task) => task.interruptDate,
    ).length;

  const totalMinutes =
    state.tasks
      .filter((task) => task.completeDate)
      .reduce(
        (acc, task) =>
          acc + task.minutes,
        0,
      );

  const totalHours = (
    totalMinutes / 60
  ).toFixed(1);

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h2>
          {completedTasks}
        </h2>

        <span>
          Pomodoros concluídos
        </span>
      </div>

      <div className={styles.card}>
        <h2>
          {interruptedTasks}
        </h2>

        <span>
          Interrompidos
        </span>
      </div>

      <div className={styles.card}>
        <h2>
          {totalHours}h
        </h2>

        <span>
          Horas focadas
        </span>
      </div>
    </section>
  );
}
import { useContext, useRef } from 'react';

import { Play, HandPalm } from 'phosphor-react';

import { TaskContext } from '../../contexts/TaskContext/TaskContextProvider';

import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';

import { showMessage } from '../../adapters/showMessage';

import { unlockBeep } from '../../utils/loadBeep';

import styles from './styles.module.css';

export function MainForm() {
  const { state, dispatch, interruptTask } = useContext(TaskContext);

  const taskNameInput = useRef<HTMLInputElement>(null);

  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const minutes = state.config.workTime;

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    unlockBeep();

    showMessage.dismiss();

    if (state.activeTask || taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa');
      return;
    }

    dispatch({
      type: TaskActionTypes.START_TASK,
      payload: {
        id: String(new Date().getTime()),
        name: taskName,
        minutes,
        duration: minutes,
        startDate: new Date().getTime(),
        type: 'workTime',
        secondsRemaining: minutes * 60,
        completeDate: null,
        interruptDate: null,
      },
    });

    showMessage.success('Tarefa iniciada');
  }

  function handleInterruptTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    showMessage.dismiss();
    showMessage.error('Tarefa interrompida!');

    interruptTask();
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form}>
      <label htmlFor="task">Tarefa</label>

      <input
        ref={taskNameInput}
        id="task"
        placeholder="No que você vai trabalhar?"
        disabled={!!state.activeTask}
        defaultValue={lastTaskName}
      />

      <p className={styles.description}>
        {state.activeTask?.name || 'Desenvolvendo componentes React com foco.'}
      </p>

      <div className={styles.cyclesTitle}>Ciclos:</div>

      <div className={styles.cycles}>
        {state.tasks.map((task, index) => (
          <span
            key={task.id}
            className={index % 2 === 0 ? styles.yellow : styles.green}
          />
        ))}
      </div>

      {!state.activeTask ? (
        <button type="submit" className={styles.startButton}>
          <Play size={32} />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleInterruptTask}
          className={styles.stopButton}
        >
          <HandPalm size={32} />
        </button>
      )}
    </form>
  );
}
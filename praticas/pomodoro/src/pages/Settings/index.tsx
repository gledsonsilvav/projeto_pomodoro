import {
  useContext,
  useEffect,
  useRef,
} from 'react';

import { FloppyDisk } from 'phosphor-react';

import { TaskContext } from '../../contexts/TaskContext/TaskContextProvider';

import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';

import { MainTemplate } from '../../templates/MainTemplate';

import { showMessage } from '../../adapters/showMessage';

import styles from './styles.module.css';

export function Settings() {
  const { state, dispatch } =
    useContext(TaskContext);

  const workTimeInput =
    useRef<HTMLInputElement>(null);

  const shortBreakTimeInput =
    useRef<HTMLInputElement>(null);

  const longBreakTimeInput =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title =
      'Configurações - Chronos Pomodoro';
  }, []);

  function handleSaveSettings(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    showMessage.dismiss();

    const formErrors = [];

    const workTime = Number(
      workTimeInput.current?.value,
    );

    const shortBreakTime = Number(
      shortBreakTimeInput.current
        ?.value,
    );

    const longBreakTime = Number(
      longBreakTimeInput.current
        ?.value,
    );

    if (
      isNaN(workTime) ||
      isNaN(shortBreakTime) ||
      isNaN(longBreakTime)
    ) {
      formErrors.push(
        'Digite apenas números para TODOS os campos',
      );
    }

    if (
      workTime < 1 ||
      workTime > 99
    ) {
      formErrors.push(
        'Digite valores entre 1 e 99 para foco',
      );
    }

    if (
      shortBreakTime < 1 ||
      shortBreakTime > 30
    ) {
      formErrors.push(
        'Digite valores entre 1 e 30 para descanso curto',
      );
    }

    if (
      longBreakTime < 1 ||
      longBreakTime > 60
    ) {
      formErrors.push(
        'Digite valores entre 1 e 60 para descanso longo',
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach(
        (error) => {
          showMessage.error(error);
        },
      );

      return;
    }

    dispatch({
      type:
        TaskActionTypes.CHANGE_SETTINGS,

      payload: {
        workTime,

        shortBreakTime,

        longBreakTime,
      },
    });

    showMessage.success(
      'Configurações salvas',
    );
  }

  return (
    <MainTemplate>
      <main className={styles.container}>
        <section className={styles.heading}>
          <h1>Configurações</h1>
        </section>

        <p className={styles.description}>
          Modifique as configurações para tempo de foco, descanso curto e
          descanso longo.
        </p>

        <form
          onSubmit={
            handleSaveSettings
          }
          action=""
          className={styles.form}
        >
          <div
            className={
              styles.formRow
            }
          >
            <label htmlFor="workTime">
              Foco
            </label>

            <input
              ref={workTimeInput}
              id="workTime"
              type="number"
              defaultValue={
                state.config
                  .workTime
              }
            />
          </div>

          <div
            className={
              styles.formRow
            }
          >
            <label htmlFor="shortBreakTime">
              Descanso curto
            </label>

            <input
              ref={
                shortBreakTimeInput
              }
              id="shortBreakTime"
              type="number"
              defaultValue={
                state.config
                  .shortBreakTime
              }
            />
          </div>

          <div
            className={
              styles.formRow
            }
          >
            <label htmlFor="longBreakTime">
              Descanso longo
            </label>

            <input
              ref={
                longBreakTimeInput
              }
              id="longBreakTime"
              type="number"
              defaultValue={
                state.config
                  .longBreakTime
              }
            />
          </div>

          <div
            className={
              styles.formRow
            }
          >
            <button
              type="submit"
              aria-label="Salvar configurações"
              title="Salvar configurações"
            >
              <FloppyDisk
                size={28}
              />
            </button>
          </div>
        </form>
      </main>
    </MainTemplate>
  );
}
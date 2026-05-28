import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { FloppyDisk } from 'phosphor-react';

import { TaskContext } from '../../contexts/TaskContext/TaskContextProvider';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';

import { MainTemplate } from '../../templates/MainTemplate';
import { showMessage } from '../../adapters/showMessage';
import { apiFetch } from '../../services/api';

import styles from './styles.module.css';

export function Settings() {
  const { state, dispatch } = useContext(TaskContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await apiFetch('/settings');

        dispatch({
          type: TaskActionTypes.CHANGE_SETTINGS,
          payload: {
            workTime: settings.workTime,
            shortBreakTime: settings.shortBreakTime,
            longBreakTime: settings.longBreakTime,
          },
        });
      } catch (error) {
        showMessage.error(
          error instanceof Error
            ? error.message
            : 'Erro ao carregar configurações',
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, [dispatch]);

  async function handleSaveSettings(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    showMessage.dismiss();

    const formErrors = [];

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (
      isNaN(workTime) ||
      isNaN(shortBreakTime) ||
      isNaN(longBreakTime)
    ) {
      formErrors.push('Digite apenas números para TODOS os campos');
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push('Digite valores entre 1 e 99 para foco');
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('Digite valores entre 1 e 30 para descanso curto');
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('Digite valores entre 1 e 60 para descanso longo');
    }

    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        showMessage.error(error);
      });

      return;
    }

    try {
      setIsSaving(true);

      const settings = await apiFetch('/settings', {
        method: 'PUT',
        body: JSON.stringify({
          workTime,
          shortBreakTime,
          longBreakTime,
        }),
      });

      dispatch({
        type: TaskActionTypes.CHANGE_SETTINGS,
        payload: {
          workTime: settings.workTime,
          shortBreakTime: settings.shortBreakTime,
          longBreakTime: settings.longBreakTime,
        },
      });

      showMessage.success('Configurações salvas no banco');
    } catch (error) {
      showMessage.error(
        error instanceof Error
          ? error.message
          : 'Erro ao salvar configurações',
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <MainTemplate>
        <main className={styles.container}>
          <p>Carregando configurações...</p>
        </main>
      </MainTemplate>
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
          onSubmit={handleSaveSettings}
          action=""
          className={styles.form}
        >
          <div className={styles.formRow}>
            <label htmlFor="workTime">Foco</label>

            <input
              ref={workTimeInput}
              id="workTime"
              type="number"
              defaultValue={state.config.workTime}
            />
          </div>

          <div className={styles.formRow}>
            <label htmlFor="shortBreakTime">Descanso curto</label>

            <input
              ref={shortBreakTimeInput}
              id="shortBreakTime"
              type="number"
              defaultValue={state.config.shortBreakTime}
            />
          </div>

          <div className={styles.formRow}>
            <label htmlFor="longBreakTime">Descanso longo</label>

            <input
              ref={longBreakTimeInput}
              id="longBreakTime"
              type="number"
              defaultValue={state.config.longBreakTime}
            />
          </div>

          <div className={styles.formRow}>
            <button
              type="submit"
              aria-label="Salvar configurações"
              title="Salvar configurações"
              disabled={isSaving}
            >
              <FloppyDisk size={28} />
            </button>
          </div>
        </form>
      </main>
    </MainTemplate>
  );
}
import { Trash } from 'phosphor-react';

import {
  useContext,
  useEffect,
  useState,
} from 'react';

import { TaskContext } from '../../contexts/TaskContext/TaskContextProvider';

import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';

import { MainTemplate } from '../../templates/MainTemplate';

import { showMessage } from '../../adapters/showMessage';

import { formatDate } from '../../utils/formatDate';

import { getTaskStatus } from '../../utils/getTaskStatus';

import {
  sortTasks,
  type SortTasksOptions,
} from '../../utils/sortTasks';

import styles from './styles.module.css';

export function History() {
  const { state, dispatch } =
    useContext(TaskContext);

  const [
    confirmClearHistory,
    setConfirmClearHistory,
  ] = useState(false);

  const hasTasks =
    state.tasks.length > 0;

  const [
    sortTasksOptions,
    setSortTaskOptions,
  ] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({
          tasks: state.tasks,
        }),

        field: 'startDate',

        direction: 'desc',
      };
    },
  );

  useEffect(() => {
    document.title =
      'Histórico - Chronos Pomodoro';
  }, []);

  useEffect(() => {
    setSortTaskOptions(
      (prevState) => ({
        ...prevState,

        tasks: sortTasks({
          tasks: state.tasks,

          direction:
            prevState.direction,

          field: prevState.field,
        }),
      }),
    );
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory)
      return;

    setConfirmClearHistory(false);

    dispatch({
      type: TaskActionTypes.RESET_STATE,
    });
  }, [
    confirmClearHistory,
    dispatch,
  ]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleSortTasks({
    field,
  }: Pick<
    SortTasksOptions,
    'field'
  >) {
    const newDirection =
      sortTasksOptions.direction ===
      'desc'
        ? 'asc'
        : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,

        tasks:
          sortTasksOptions.tasks,

        field,
      }),

      direction: newDirection,

      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss();

    showMessage.confirm(
      'Tem certeza?',
      (confirmation) => {
        setConfirmClearHistory(
          confirmation,
        );
      },
    );
  }

  return (
    <MainTemplate>
      <main className={styles.container}>
        <section className={styles.heading}>
          <h1>History</h1>

          {hasTasks && (
            <button
              type="button"
              className={
                styles.deleteButton
              }
              aria-label="Apagar histórico"
              title="Apagar histórico"
              onClick={
                handleResetHistory
              }
            >
              <Trash size={22} />
            </button>
          )}
        </section>

        {hasTasks && (
          <div
            className={
              styles.responsiveTable
            }
          >
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() =>
                      handleSortTasks({
                        field: 'name',
                      })
                    }
                    className={
                      styles.thSort
                    }
                  >
                    Tarefa ↕
                  </th>

                  <th
                    onClick={() =>
                      handleSortTasks({
                        field:
                          'duration',
                      })
                    }
                    className={
                      styles.thSort
                    }
                  >
                    Duração ↕
                  </th>

                  <th
                    onClick={() =>
                      handleSortTasks({
                        field:
                          'startDate',
                      })
                    }
                    className={
                      styles.thSort
                    }
                  >
                    Data ↕
                  </th>

                  <th>Status</th>

                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortTasksOptions.tasks.map(
                  (task) => {
                    const taskTypeDictionary =
                      {
                        workTime:
                          'Foco',

                        shortBreakTime:
                          'Descanso curto',

                        longBreakTime:
                          'Descanso longo',
                      };

                    return (
                      <tr
                        key={task.id}
                      >
                        <td>
                          {task.name}
                        </td>

                        <td>
                          {
                            task.duration
                          }
                          min
                        </td>

                        <td>
                          {formatDate(
                            task.startDate,
                          )}
                        </td>

                        <td>
                          {getTaskStatus(
                            task,
                            state.activeTask,
                          )}
                        </td>

                        <td>
                          {
                            taskTypeDictionary[
                              task.type
                            ]
                          }
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p
            style={{
              textAlign: 'center',

              fontWeight: 'bold',
            }}
          >
            Ainda não existem
            tarefas criadas.
          </p>
        )}
      </main>
    </MainTemplate>
  );
}
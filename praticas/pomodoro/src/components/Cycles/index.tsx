import { useContext } from 'react';

import { TaskContext } from '../../contexts/TaskContext/TaskContextProvider';

import styles from './styles.module.css';

export function Cycles() {
  const { state } = useContext(TaskContext);

  return (
    <div className={styles.container}>
      <h2>Histórico</h2>

      <table>
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {state.tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.name}</td>

                <td>{task.minutes} min</td>

                <td>
                  {task.completeDate && (
                    <span className={styles.completed}>
                      Concluído
                    </span>
                  )}

                  {task.interruptDate && (
                    <span className={styles.interrupted}>
                      Interrompido
                    </span>
                  )}

                  {!task.completeDate &&
                    !task.interruptDate && (
                      <span className={styles.running}>
                        Em andamento
                      </span>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
import {
  createContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';

import { TaskActionTypes } from './TaskActions';
import { taskReducer } from './taskReducer';
import { initialTaskState } from './initialTaskState';

import type { TaskStateModel } from '../../models/TaskStateModel';

import { TimerWorkerManager } from '../../workers/TimerWorkerManager';

import { playBeep } from '../../utils/loadBeep';

interface TaskContextType {
  state: TaskStateModel;
  dispatch: React.Dispatch<any>;
  interruptTask: () => void;
}

export const TaskContext = createContext({} as TaskContextType);

export function TaskContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTaskState,
    () => {
      try {
        const storageState =
          localStorage.getItem('state');

        if (storageState === null) {
          return initialTaskState;
        }

        const parsedStorageState = JSON.parse(
          storageState,
        ) as TaskStateModel;

        return {
          ...parsedStorageState,
          activeTask: null,
          secondsRemaining: 0,
          formattedSecondsRemaining: '00:00',
        };
      } catch {
        return initialTaskState;
      }
    },
  );

  const worker = useRef(
    TimerWorkerManager.getInstance(),
  ).current;

  const activeTaskId = state.activeTask?.id;

  function interruptTask() {
    worker.postMessage({
      command: 'stop',
    });

    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
    });
  }

  useEffect(() => {
    worker.onmessage((e) => {
      const countDownSeconds = e.data;

      if (countDownSeconds <= 0) {
        playBeep();

        worker.postMessage({
          command: 'stop',
        });

        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: {
            secondsRemaining:
              countDownSeconds,
          },
        });
      }
    });
  }, [worker]);

  useEffect(() => {
    localStorage.setItem(
      'state',
      JSON.stringify(state),
    );

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
  }, [state]);

  useEffect(() => {
    if (!state.activeTask) {
      worker.postMessage({
        command: 'stop',
      });

      return;
    }

    worker.postMessage({
      command: 'start',
      seconds:
        state.activeTask.secondsRemaining,
    });
  }, [activeTaskId, worker]);

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        interruptTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
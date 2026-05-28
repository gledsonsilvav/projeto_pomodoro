import {
  TaskActionTypes,
  type TaskActionModel,
} from './TaskActions';

import type { TaskStateModel } from '../../models/TaskStateModel';
import type { TaskModel } from '../../models/TaskModel';

import { initialTaskState } from './initialTaskState';

function formatSeconds(seconds: number) {
  const minutesAmount = Math.floor(seconds / 60);
  const secondsAmount = seconds % 60;

  return `${String(minutesAmount).padStart(2, '0')}:${String(
    secondsAmount,
  ).padStart(2, '0')}`;
}

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.LOAD_TASKS: {
      const lastTask = action.payload[0];

      return {
        ...state,
        tasks: action.payload,
        currentCycle: lastTask?.cycle || 0,
      };
    }

    case TaskActionTypes.START_TASK: {
      const secondsRemaining = action.payload.secondsRemaining;

      return {
        ...state,
        currentCycle: action.payload.cycle,
        tasks: [...state.tasks, action.payload],
        activeTask: action.payload,
        secondsRemaining,
        formattedSecondsRemaining: formatSeconds(secondsRemaining),
      };
    }

    case TaskActionTypes.COUNT_DOWN:
      if (!state.activeTask) return state;

      return {
        ...state,
        activeTask: {
          ...state.activeTask,
          secondsRemaining: action.payload.secondsRemaining,
        },
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSeconds(
          action.payload.secondsRemaining,
        ),
        tasks: state.tasks.map((task: TaskModel) =>
          task.id === state.activeTask?.id
            ? {
                ...task,
                secondsRemaining: action.payload.secondsRemaining,
              }
            : task,
        ),
      };

    case TaskActionTypes.COMPLETE_TASK:
      if (!state.activeTask) return state;

      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map((task: TaskModel) =>
          task.id === state.activeTask?.id
            ? {
                ...task,
                completeDate: new Date().getTime(),
                secondsRemaining: 0,
              }
            : task,
        ),
      };

    case TaskActionTypes.INTERRUPT_TASK:
      if (!state.activeTask) return state;

      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map((task: TaskModel) =>
          task.id === state.activeTask?.id
            ? {
                ...task,
                interruptDate: new Date().getTime(),
              }
            : task,
        ),
      };

    case TaskActionTypes.RESET_STATE:
      return {
        ...initialTaskState,
        config: state.config,
      };

    case TaskActionTypes.CHANGE_SETTINGS:
      return {
        ...state,
        config: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
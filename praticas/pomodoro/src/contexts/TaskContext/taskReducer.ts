import {
  TaskActionTypes,
  type TaskActionModel,
} from './TaskActions';

import type { TaskStateModel } from '../../models/TaskStateModel';

import type { TaskModel } from '../../models/TaskModel';

import { initialTaskState } from './initialTaskState';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK:
      return {
        ...state,

        tasks: [
          ...state.tasks,
          action.payload,
        ],

        activeTask: action.payload,
      };

    case TaskActionTypes.COUNT_DOWN:
      if (!state.activeTask)
        return state;

      return {
        ...state,

        activeTask: {
          ...state.activeTask,

          secondsRemaining:
            action.payload
              .secondsRemaining,
        },

        secondsRemaining:
          action.payload
            .secondsRemaining,

        formattedSecondsRemaining:
          String(
            Math.floor(
              action.payload
                .secondsRemaining /
                60,
            ),
          ).padStart(2, '0') +
          ':' +
          String(
            action.payload
              .secondsRemaining %
              60,
          ).padStart(2, '0'),

        tasks: state.tasks.map(
          (task: TaskModel) =>
            task.id ===
            state.activeTask?.id
              ? {
                  ...task,

                  secondsRemaining:
                    action.payload
                      .secondsRemaining,
                }
              : task,
        ),
      };

    case TaskActionTypes.COMPLETE_TASK:
      if (!state.activeTask)
        return state;

      return {
        ...state,

        activeTask: null,

        secondsRemaining: 0,

        formattedSecondsRemaining:
          '00:00',

        tasks: state.tasks.map(
          (task: TaskModel) =>
            task.id ===
            state.activeTask?.id
              ? {
                  ...task,

                  completeDate:
                    new Date().getTime(),
                }
              : task,
        ),
      };

    case TaskActionTypes.INTERRUPT_TASK:
      if (!state.activeTask)
        return state;

      return {
        ...state,

        activeTask: null,

        secondsRemaining: 0,

        formattedSecondsRemaining:
          '00:00',

        tasks: state.tasks.map(
          (task: TaskModel) =>
            task.id ===
            state.activeTask?.id
              ? {
                  ...task,

                  interruptDate:
                    new Date().getTime(),
                }
              : task,
        ),
      };

    case TaskActionTypes.RESET_STATE:
      return {
        ...initialTaskState,
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
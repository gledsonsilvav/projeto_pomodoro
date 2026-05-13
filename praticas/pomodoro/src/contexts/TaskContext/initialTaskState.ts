import type { TaskStateModel } from '../../models/TaskStateModel';

export const initialTaskState: TaskStateModel = {
  tasks: [],
  activeTask: null,
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};
export type TaskType =
  | 'workTime'
  | 'shortBreakTime'
  | 'longBreakTime';

export type TaskModel = {
  id: string;

  name: string;

  minutes: number;

  duration: number;

  startDate: number;

  type: TaskType;

  secondsRemaining: number;

  completeDate: number | null;

  interruptDate: number | null;
};
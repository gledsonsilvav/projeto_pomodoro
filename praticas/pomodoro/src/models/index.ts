// 1. Modelo da Tarefa Individual
export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  // Aqui acessamos a chave diretamente para evitar o erro de importação circular
  type: 'workTime' | 'shortBreakTime' | 'longBreakTime';
  completed?: boolean;
};

// 2. Modelo do Estado Global
export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number;
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
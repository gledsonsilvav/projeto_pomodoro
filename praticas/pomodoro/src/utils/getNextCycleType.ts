import type { TaskModel } from '../models/TaskModel';

// O retorno é estrito: ou é foco, ou pausa curta, ou pausa longa
export function getNextCycleType(currentCycle: number): TaskModel['type'] {
  // 1. Se o ciclo é 8, 16, 24... é Pausa Longa
  if (currentCycle % 8 === 0) return 'longBreakTime';

  // 2. Se o ciclo é par (2, 4, 6), é Pausa Curta
  if (currentCycle % 2 === 0) return 'shortBreakTime';

  // 3. Se é ímpar (1, 3, 5, 7), é Foco
  return 'workTime';
}
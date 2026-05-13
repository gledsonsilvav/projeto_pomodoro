import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();

  // Cálculos para o estado "Futuro" (quando não há tarefa ativa)
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCyleType = getNextCycleType(nextCycle);

  // Mensagens de PRESENTE (Tarefa rodando)
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por <b>{state.config.workTime}min</b></span>,
    shortBreakTime: <span>Descanse por <b>{state.config.shortBreakTime}min</b></span>,
    longBreakTime: <span>Descanso longo (<b>{state.config.longBreakTime}min</b>)</span>,
  };

  // Mensagens de FUTURO (Antes de iniciar)
  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>Próximo descanso é de <b>{state.config.shortBreakTime}min</b></span>
    ),
    longBreakTime: (
      <span>Próximo descanso será longo (<b>{state.config.longBreakTime}min</b>)</span>
    ),
  };

  return (
    <>
      {/* Se houver tarefa ativa, mostra mensagem de presente baseada no tipo da tarefa atual */}
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      
      {/* Se NÃO houver tarefa ativa, mostra mensagem de futuro baseada no próximo ciclo */}
      {!state.activeTask && tipsForNoActiveTask[nextCyleType]}
    </>
  );
}
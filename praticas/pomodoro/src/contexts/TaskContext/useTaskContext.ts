import { useContext } from 'react';
import { TaskContext } from './TaskContext';

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskContextProvider');
  }
  return context;
}
import { useState } from 'react';
import type { ReactNode } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';

export function TaskContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialTaskState);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}
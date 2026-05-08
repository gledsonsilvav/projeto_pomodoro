import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { TaskStateModel } from '../../models';
import { initialTaskState } from './initialTaskState';

export type TaskContextProps = {
  state: TaskStateModel;
  setState: Dispatch<SetStateAction<TaskStateModel>>;
};

const initialContextValue: TaskContextProps = {
  state: initialTaskState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
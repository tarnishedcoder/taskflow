import type { BoardData, Task, Column } from './types';

export type BoardAction =
  | { type: 'ADD_TASK'; payload: { columnId: string; task: Task } }
  | { type: 'DELETE_TASK'; payload: { taskId: string; columnId: string } }
  | { type: 'MOVE_TASK'; payload: { taskId: string; fromColumnId: string; toColumnId: string } }
  | { type: 'LOAD_BOARD'; payload: { tasks: Record<string, Task>; columns: Record<string, Column> } };

export function boardReducer(state: BoardData, action: BoardAction): BoardData {
  switch (action.type) {
    case 'ADD_TASK': {
      const { columnId, task } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [task.id]: task,
        },
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            taskIds: [...state.columns[columnId].taskIds, task.id],
          },
        },
      };
    }

    case 'DELETE_TASK': {
      const { taskId, columnId } = action.payload;
      const { [taskId]: _removed, ...remainingTasks } = state.tasks;
      return {
        ...state,
        tasks: remainingTasks,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            taskIds: state.columns[columnId].taskIds.filter((id) => id !== taskId),
          },
        },
      };
    }

    case 'MOVE_TASK': {
      const { taskId, fromColumnId, toColumnId } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [taskId]: { ...state.tasks[taskId], status: columnIdToStatus(toColumnId) },
        },
        columns: {
          ...state.columns,
          [fromColumnId]: {
            ...state.columns[fromColumnId],
            taskIds: state.columns[fromColumnId].taskIds.filter((id) => id !== taskId),
          },
          [toColumnId]: {
            ...state.columns[toColumnId],
            taskIds: [...state.columns[toColumnId].taskIds, taskId],
          },
        },
      };
    }

    case 'LOAD_BOARD': {
      return {
        ...state,
        tasks: action.payload.tasks,
        columns: action.payload.columns,
      };
    }

    default:
      return state;
  }
}

function columnIdToStatus(columnId: string): Task['status'] {
  if (columnId === 'col-todo') return 'todo';
  if (columnId === 'col-in-progress') return 'in-progress';
  return 'done';
}
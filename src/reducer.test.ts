import { boardReducer } from './reducer';
import type { BoardData, Task } from './types';

const mockTask: Task = {
  id: 'task-1',
  title: 'Test Task',
  description: 'A task for testing',
  status: 'todo',
  createdAt: '2026-01-01T00:00:00.000Z',
};

const initialState: BoardData = {
  tasks: {},
  columns: {
    'col-todo': { id: 'col-todo', title: 'To Do', taskIds: [] },
    'col-in-progress': { id: 'col-in-progress', title: 'In Progress', taskIds: [] },
    'col-done': { id: 'col-done', title: 'Done', taskIds: [] },
  },
  columnOrder: ['col-todo', 'col-in-progress', 'col-done'],
};

describe('boardReducer', () => {
  it('adds a task to the correct column on ADD_TASK', () => {
    const newState = boardReducer(initialState, {
      type: 'ADD_TASK',
      payload: { columnId: 'col-todo', task: mockTask },
    });

    expect(newState.tasks['task-1']).toEqual(mockTask);
    expect(newState.columns['col-todo'].taskIds).toContain('task-1');
  });

  it('removes a task from its column on DELETE_TASK', () => {
    const stateWithTask: BoardData = {
      ...initialState,
      tasks: { 'task-1': mockTask },
      columns: {
        ...initialState.columns,
        'col-todo': { ...initialState.columns['col-todo'], taskIds: ['task-1'] },
      },
    };

    const newState = boardReducer(stateWithTask, {
      type: 'DELETE_TASK',
      payload: { taskId: 'task-1', columnId: 'col-todo' },
    });

    expect(newState.tasks['task-1']).toBeUndefined();
    expect(newState.columns['col-todo'].taskIds).not.toContain('task-1');
  });

  it('moves a task between columns and updates its status on MOVE_TASK', () => {
    const stateWithTask: BoardData = {
      ...initialState,
      tasks: { 'task-1': mockTask },
      columns: {
        ...initialState.columns,
        'col-todo': { ...initialState.columns['col-todo'], taskIds: ['task-1'] },
      },
    };

    const newState = boardReducer(stateWithTask, {
      type: 'MOVE_TASK',
      payload: { taskId: 'task-1', fromColumnId: 'col-todo', toColumnId: 'col-done' },
    });

    expect(newState.columns['col-todo'].taskIds).not.toContain('task-1');
    expect(newState.columns['col-done'].taskIds).toContain('task-1');
    expect(newState.tasks['task-1'].status).toBe('done');
  });
});
import type { BoardData } from '../../types';

export const seedData: BoardData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      name: 'Set up project',
      description: 'Scaffold with Vite + TypeScript',
      status: 'completed',
      createdAt: "2023-06-01T10:00:00Z",
      updatedAt: "2023-06-01T10:00:00Z",
    },
    'task-2': {
      id: 'task-2',
      name: 'Define TypeScript interfaces',
      description: 'Task, Column, BoardData',
      status: 'in-progress',
      createdAt: "2023-06-01T10:00:00Z",
      updatedAt: "2023-06-01T10:00:00Z",
    },
    'task-3': {
      id: 'task-3',
      name: 'Build TaskCard component',
      description: 'Render a single task visually',
      status: 'todo',
      createdAt: "2023-06-01T10:00:00Z",
      updatedAt: "2023-06-01T10:00:00Z",
    },
  },
  columns: {
    'col-todo': { id: 'col-todo', title: 'To Do', taskIds: ['task-3'] },
    'col-in-progress': { id: 'col-in-progress', title: 'In Progress', taskIds: ['task-2'] },
    'col-done': { id: 'col-done', title: 'Done', taskIds: ['task-1'] },
  },
  columnOrder: ['col-todo', 'col-in-progress', 'col-done'],
};
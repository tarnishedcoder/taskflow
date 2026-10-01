import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from './TaskCard';
import type { Task } from '../types';

const mockTask: Task = {
  id: 'task-1',
  title: 'Test Task',
  description: 'A task for testing',
  status: 'todo',
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('TaskCard', () => {
  it('renders the task title and description', () => {
    render(<TaskCard task={mockTask} columnId="col-todo" dispatch={jest.fn()} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('A task for testing')).toBeInTheDocument();
  });

  it('renders the correct status badge', () => {
    render(<TaskCard task={mockTask} columnId="col-todo" dispatch={jest.fn()} />);

    expect(screen.getByText('todo')).toBeInTheDocument();
  });
});
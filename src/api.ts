import type { Task } from './types';

const BASE_URL = 'http://localhost:3001';

// Fetch all tasks and reshape them into the keyed-object format your app uses
export async function fetchTasks(): Promise<Record<string, Task>> {
  const res = await fetch(`${BASE_URL}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  const tasksArray: Task[] = await res.json();

  // Convert array -> object keyed by id, e.g. { "task-1": {...}, "task-2": {...} }
  const tasksById: Record<string, Task> = {};
  for (const task of tasksArray) {
    tasksById[task.id] = task;
  }
  return tasksById;
}

// Create a new task on the server
export async function createTask(task: Task): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

// Update an existing task (e.g. when it moves columns and its status changes)
export async function updateTask(id: string, changes: Partial<Task>): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

// Delete a task
export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}
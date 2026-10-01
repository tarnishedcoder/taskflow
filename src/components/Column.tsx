import { useState } from "react";
import type { Column as ColumnType, Task } from "../types";
import type { BoardAction } from "../reducer";
import { createTask } from "../api";
import TaskCard from "./TaskCard";
import './Column.css';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  dispatch: React.Dispatch<BoardAction>;
}

function columnIdToStatus(columnId: string): Task["status"] {
  if (columnId === 'col-todo') return 'todo';
  if (columnId === 'col-in-progress') return 'in-progress';
  return 'done';
}

function Column({ column, tasks, dispatch }: ColumnProps) {
  const [newTitle, setNewTitle] = useState('');

  async function handleAddTask() {
    if (newTitle.trim() === '') return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: '',
      status: columnIdToStatus(column.id),
      createdAt: new Date().toISOString(),
    };

    try {
      await createTask(newTask);
      dispatch({ type: 'ADD_TASK', payload: { columnId: column.id, task: newTask } });
      setNewTitle('');
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  }

  return (
    <div className="column">
      <h2>{column.title}</h2>
      <div className="column-tasks">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={column.id} dispatch={dispatch} />
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default Column;
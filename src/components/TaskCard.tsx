import './TaskCard.css';
import type { Task } from '../types';
import type { BoardAction } from '../reducer';
import { deleteTask, updateTask } from '../api';

interface TaskCardProps {
  task: Task;
  columnId: string;
  dispatch: React.Dispatch<BoardAction>;
}

function columnIdToStatus(columnId: string): Task['status'] {
  if (columnId === 'col-todo') return 'todo';
  if (columnId === 'col-in-progress') return 'in-progress';
  return 'done';
}

function TaskCard({ task, columnId, dispatch }: TaskCardProps) {
  async function handleDelete() {
    try {
      await deleteTask(task.id);
      dispatch({ type: 'DELETE_TASK', payload: { taskId: task.id, columnId } });
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  }

  async function handleMove(direction: 'forward' | 'back') {
    const order = ['col-todo', 'col-in-progress', 'col-done'];
    const currentIndex = order.indexOf(columnId);
    const targetIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex < 0 || targetIndex >= order.length) return; // already at an edge

    const toColumnId = order[targetIndex];
    const newStatus = columnIdToStatus(toColumnId);

    try {
      await updateTask(task.id, { status: newStatus });
      dispatch({
        type: 'MOVE_TASK',
        payload: { taskId: task.id, fromColumnId: columnId, toColumnId },
      });
    } catch (err) {
      console.error('Failed to move task:', err);
    }
  }

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className={`status-badge status-${task.status}`}>{task.status}</span>
      <div className="task-actions">
        <button onClick={() => handleMove('back')}>←</button>
        <button onClick={() => handleMove('forward')}>→</button>
        <button onClick={handleDelete}>✕</button>
      </div>
    </div>
  );
}

export default TaskCard;
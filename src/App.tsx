import { useReducer, useEffect, useState } from 'react';
import Board from './components/Board';
import { boardReducer } from './reducer';
import { fetchTasks } from './api';
import type { BoardData, Column } from './types';

// Columns stay static — only tasks come from the API (as decided earlier)
const initialColumns: Record<string, Column> = {
  'col-todo': { id: 'col-todo', title: 'To Do', taskIds: [] },
  'col-in-progress': { id: 'col-in-progress', title: 'In Progress', taskIds: [] },
  'col-done': { id: 'col-done', title: 'Done', taskIds: [] },
};

const emptyBoard: BoardData = {
  tasks: {},
  columns: initialColumns,
  columnOrder: ['col-todo', 'col-in-progress', 'col-done'],
};

function App() {
  const [board, dispatch] = useReducer(boardReducer, emptyBoard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
      .then((tasksById) => {
        // Rebuild each column's taskIds based on each task's status
        const columns = structuredClone(initialColumns);
        Object.values(tasksById).forEach((task) => {
          const columnId = statusToColumnId(task.status);
          columns[columnId].taskIds.push(task.id);
        });

        dispatch({ type: 'LOAD_BOARD', payload: { tasks: tasksById, columns } });
      })
      .catch((err) => console.error('Failed to load tasks:', err))
      .finally(() => setLoading(false));
  }, []); // empty array = run once, when the component first mounts

  function statusToColumnId(status: string): string {
    if (status === 'todo') return 'col-todo';
    if (status === 'in-progress') return 'col-in-progress';
    return 'col-done';
  }

  if (loading) return <p>Loading board...</p>;

  return <Board board={board} dispatch={dispatch} />;
}

export default App;
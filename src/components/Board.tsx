import { useState } from 'react';
import {
  DndContext,
  type DragEndEvent,
  closestCenter,
} from '@dnd-kit/core';
import type { BoardData } from '../types';
import type { BoardAction } from '../reducer';
import type { Dispatch } from 'react';
import { updateTask } from '../api';
import Column from './Column';
import './Board.css';

interface BoardProps {
  board: BoardData;
  dispatch: Dispatch<BoardAction>;
}

function findColumnIdForTask(board: BoardData, taskId: string): string | undefined {
  return board.columnOrder.find((columnId) =>
    board.columns[columnId].taskIds.includes(taskId)
  );
}

function statusForColumn(columnId: string): 'todo' | 'in-progress' | 'done' {
  if (columnId === 'col-todo') return 'todo';
  if (columnId === 'col-in-progress') return 'in-progress';
  return 'done';
}

function Board({ board, dispatch }: BoardProps) {
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return; // dropped outside any valid target

    const taskId = String(active.id);
    const overId = String(over.id);

    // over.id might be a column id directly, or a task id (if dropped onto another card)
    const toColumnId = board.columnOrder.includes(overId)
      ? overId
      : findColumnIdForTask(board, overId);

    const fromColumnId = findColumnIdForTask(board, taskId);

    if (!fromColumnId || !toColumnId || fromColumnId === toColumnId) return;

    try {
      await updateTask(taskId, { status: statusForColumn(toColumnId) });
      dispatch({
        type: 'MOVE_TASK',
        payload: { taskId, fromColumnId, toColumnId },
      });
    } catch (err) {
      console.error('Failed to move task:', err);
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="board">
        {board.columnOrder.map((columnId) => {
          const column = board.columns[columnId];
          const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);
          return <Column key={columnId} column={column} tasks={tasks} dispatch={dispatch} />;
        })}
      </div>
    </DndContext>
  );
}

export default Board;
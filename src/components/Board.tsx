import type { BoardData } from '../../types';
import type { BoardAction } from '../reducer';
import type { Dispatch } from 'react';
import Column from './Column';
import './Board.css';

                    
interface BoardProps {
  board: BoardData;
  dispatch: Dispatch<BoardAction>;
}

function Board({ board, dispatch }: BoardProps) {
  return (
    <div className="board">
      {board.columnOrder.map((columnId) => {
        const column = board.columns[columnId];
        const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);
        return <Column key={columnId} column={column} tasks={tasks} dispatch={dispatch} />;
      })}
    </div>
  );
}

export default Board;               
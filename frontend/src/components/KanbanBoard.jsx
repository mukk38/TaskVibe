import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const KanbanBoard = ({ tasks, onUpdateTask }) => {
  const columns = ['TODO', 'IN_PROGRESS', 'DONE'];

  const [{ isOver: isOverTodo }, todoDrop] = useDrop({
    accept: 'TASK',
    drop: (item) => onUpdateTask(item.id, { ...item, status: 'TODO' }),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const [{ isOver: isOverInProgress }, inProgressDrop] = useDrop({
    accept: 'TASK',
    drop: (item) => onUpdateTask(item.id, { ...item, status: 'IN_PROGRESS' }),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const [{ isOver: isOverDone }, doneDrop] = useDrop({
    accept: 'TASK',
    drop: (item) => onUpdateTask(item.id, { ...item, status: 'DONE' }),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {columns.map((column, index) => (
        <div
          key={column}
          ref={[todoDrop, inProgressDrop, doneDrop][index]}
          className={`p-4 rounded-lg ${isOverTodo && index === 0 ? 'bg-gray-200' : ''} ${
            isOverInProgress && index === 1 ? 'bg-gray-200' : ''
          } ${isOverDone && index === 2 ? 'bg-gray-200' : ''} bg-gray-100`}
        >
          <h2 className="text-xl font-semibold mb-2">{column.replace('_', ' ')}</h2>
          {tasks
            .filter((task) => task.status === column)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
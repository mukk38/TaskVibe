import React from 'react';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: task,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 mb-2 bg-white rounded shadow ${isDragging ? 'opacity-50' : ''}`}
    >
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
    </div>
  );
};

export default TaskCard;
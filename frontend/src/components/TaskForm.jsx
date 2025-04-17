import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({ title: '', description: '', assignee: '', status: 'TODO' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(task);
    setTask({ title: '', description: '', assignee: '', status: 'TODO' });
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Add Task</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Assignee"
          value={task.assignee}
          onChange={(e) => setTask({ ...task, assignee: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
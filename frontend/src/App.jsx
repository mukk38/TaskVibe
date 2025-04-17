import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanBoard from './components/KanbanBoard';
import TaskForm from './components/TaskForm';
import Notification from './components/Notification';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { config } from './config';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchTasks();
    connectWebSocket();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(`${config.backendUrl}/api/tasks`);
    setTasks(response.data);
  };

  const connectWebSocket = () => {
    const socket = new SockJS(config.websocketUrl);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/tasks', (message) => {
        const task = JSON.parse(message.body);
        setNotification(`Task ${task.title || 'updated'}!`);
        fetchTasks();
        setTimeout(() => setNotification(null), 3000);
      });
    });
  };

  const addTask = async (task) => {
    await axios.post(`${config.backendUrl}/api/tasks`, task);
    fetchTasks();
  };

  const updateTask = async (id, task) => {
    await axios.put(`${config.backendUrl}/api/tasks/${id}`, task);
    fetchTasks();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">TaskVibe</h1>
        <TaskForm onAddTask={addTask} />
        <KanbanBoard tasks={tasks} onUpdateTask={updateTask} />
        {notification && <Notification message={notification} />}
      </div>
    </DndProvider>
  );
};

export default App;
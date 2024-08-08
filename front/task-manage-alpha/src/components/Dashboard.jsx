// eslint-disable-next-line no-unused-vars
import TaskList from './TaskList';
import { useState } from 'react';

function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Wash dishes', points: 10, completed: false },
    { id: 2, name: 'Clean room', points: 15, completed: false },
    { id: 3, name: 'Do homework', points: 20, completed: false },
  ]);

  const handleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <TaskList tasks={tasks} onComplete={handleComplete} />
    </div>
  );
}

export default Dashboard;
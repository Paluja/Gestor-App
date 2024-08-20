import { useEffect, useState } from 'react';
import { useAuthUser } from '../../hooks/UserContext'
import { useTaskContext } from '../../hooks/TasksContext';
function HomeUser() {
  const { user } = useAuthUser();
  const { getUserTasks } = useTaskContext();
  const [toDoTasks, setToDoTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(null);



  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getUserTasks(user[0].id_users);
      setToDoTasks(data.filter((task) => task.verified === 0 && task.done === 0));
      setPendingTasks(data.filter((task) => task.verified === 0 && task.done === 1));
      setCompletedTasks(data.filter((task) => task.verified === 1 && task.done === 1));
    }    
    fetchTasks();
  }, [getUserTasks, user]);

  return (
    <>
      <div className="profile-container">
        {user.map((user) => (
          <h2 key={user.id}>Welcome {user.name}</h2>
        ))}
      </div>
      
      <div className="tasks-container">
        <h2>Tasks</h2>
        <div className="tasks">
          <div className="tasks-todo">
            <h3>ToDo</h3>
            <ul>
              {toDoTasks ? toDoTasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              )) : <h2>No hay tareas por hacer</h2>}
            </ul>
          </div>
        </div>

          <div className="tasks-pending">
            <h3>Pending</h3>
            <ul>
              {pendingTasks ? pendingTasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              )) : <h2>No hay tareas por verificar</h2>}
            </ul>
          </div>
          <div className="tasks-completed">
            <h3>Completed</h3>
            <ul>
              {completedTasks ? completedTasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              )) : <h2>No hay tareas completadas</h2>}
            </ul>
          </div>
      </div>
    </>
  )
}

export default HomeUser
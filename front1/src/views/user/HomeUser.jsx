import { useEffect, useState } from 'react';
import { useAuthUser } from '../../hooks/UserContext'
import { useAuth } from '../../hooks/AuthAdminContext';
import { useTaskContext } from '../../hooks/TasksContext';
function HomeUser() {
  const { user } = useAuthUser();
  const { getUserTasks } = useTaskContext();
  const [toDoTasks, setToDoTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);


  const changeTaskStatusDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/update-task/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: 1 })
      });
      if (response.ok) {
        setToDoTasks(prevTasks => prevTasks.filter(task => task.id_tasks !== id));
        setPendingTasks(prevTasks => [
          ...prevTasks,
          ...toDoTasks.filter(task => task.id_tasks === id).map(task => ({ ...task, done: 1 }))
        ]);
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  }

  
  
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getUserTasks(user[0].id_users);
      setToDoTasks(data.filter((task) => task.verified === 0 && task.done === 0));
      setPendingTasks(data.filter((task) => task.verified === 0 && task.done === 1));
      setCompletedTasks(data.filter((task) => task.verified === 1 && task.done === 1));
    }    
    fetchTasks();
  }, [user, getUserTasks]);

  return (
    <>
      <div className="profile-container">
        {user.map((user) => (
          <h2 key={user.id}>Welcome {user.name}</h2>
        ))}
      </div>
      
      <div className="tasks-container">
        <h2>Tasks</h2>
        <div className="tasks-bx">
          
          <div className="tasks-todo">
            <h3>ToDo</h3>
            <ul>
              {toDoTasks.length > 0 ? toDoTasks.map((task) => (
                <li key={task.id}>
                  <h3>{task.name}</h3>
                  <button onClick={() => changeTaskStatusDone(task.id_tasks)}>Done</button>
                </li>
              )) : <h4>No hay tareas por hacer</h4>}
            </ul>
          </div>
       

          <div className="tasks-pending">
            <h3>Pending</h3>
            <ul>
              {pendingTasks.length > 0 && pendingTasks ? pendingTasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              )) : <h4>No hay tareas por verificar</h4>}
            </ul>
          </div>

          <div className="tasks-completed">
            <h3>Completed</h3>
            <ul>
              {completedTasks.length > 0 ? completedTasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              )) : <h4>No hay tareas completadas</h4>}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeUser

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthAdminContext';
import { useTaskContext } from '../../hooks/TasksContext';
import { useAuthUser } from '../../hooks/UserContext';
function HomeAdmin() {
    const { admin } = useAuth();
    const { getAllUsers } = useAuthUser();
    const {getToDoTasks,getCompletedTasks,getPendingTasks } = useTaskContext();
    const [users, setUsers] = useState([]);
    const [toDoTasks,setToDoTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    
    const changeTaskstatusVerified = async (id) => {
      
      try {
        const response = await fetch(`http://localhost:3000/tasks/update-task/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ verified: 1 })
        });
        if (response.ok) {
          setPendingTasks(prevTasks => prevTasks.filter(task => task.id_tasks !== id));
          setCompletedTasks(prevTasks => [
            ...prevTasks,
            ...pendingTasks.filter(task => task.id_tasks === id).map(task => ({ ...task, verified: 1 }))
          ]);
        }
      } catch (error) {
        console.error('Error updating task', error);
      }
    }
    
    const revokeVerifiedTask = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/update-task/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ verified: 0 })
          //meterle aqui tambien un fetch a la funcion de la bases de datos pa el manejo de los puntos

        });
        if (response.ok) {
          setCompletedTasks(prevTasks => prevTasks.filter(task => task.id_tasks !== id));
          setPendingTasks(prevTasks => [
            ...prevTasks,
            ...completedTasks.filter(task => task.id_tasks === id).map(task => ({ ...task, verified: 0 }))
          ]);
        }
      }
      catch (error) {
        console.error('Error updating task', error);
      }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getAllUsers();
            setUsers(data);
        }
        fetchUsers();
    }, [getAllUsers]);
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setToDoTasks(await getToDoTasks());
                setCompletedTasks(await getCompletedTasks());
                setPendingTasks(await getPendingTasks());
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        }
        fetchTasks();
    }, [getToDoTasks,getCompletedTasks,getPendingTasks]);

    return (
        <>
            <h1>HomeAdmin</h1>
            {admin.map((admin) => (
                <h2 key={admin.id}>Welcome {admin.name}</h2>
            ))}
            
            <div className="tasks-container">
        <h2>Tasks</h2>
        <div className="tasks-bx">
          
          <div className="tasks-todo">
            <h3>ToDo</h3>
            <ul>
              {toDoTasks.length > 0 ? toDoTasks.map((task) => (
                <li key={task.id}>
                  {task.name}
                </li>
              )) : <h4>No hay tareas por hacer</h4>}
            </ul>
          </div>
       

          <div className="tasks-pending">
            <h3>Pending</h3>
            <ul>
              {pendingTasks.length > 0 ? pendingTasks.map((task) => (
                <li key={task.id_tasks}>
                  <h3>{task.name}</h3>
                  <button onClick={()=> changeTaskstatusVerified(task.id_tasks)}>check</button>
                </li>
              )) : <h4>No hay tareas por verificar</h4>}
            </ul>
          </div>

          <div className="tasks-completed">
            <h3>Completed</h3>
            <ul>
              {completedTasks.length > 0 ? completedTasks.map((task) => (
                <li key={task.id_tasks}>
                  <h3>{task.name}</h3>
                  <button onClick={() => revokeVerifiedTask(task.id_tasks)}>Revoke</button>
                </li>
              )) : <h4>No hay tareas completadas</h4>}
            </ul>
          </div>
        </div>
        </div>
        </>
    )
}

export default HomeAdmin
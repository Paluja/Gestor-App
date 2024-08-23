
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthAdminContext';
import { useTaskContext } from '../../hooks/TasksContext';
function HomeAdmin() {
    const { admin } = useAuth();
    const {getToDoTasks,getCompletedTasks,getPendingTasks } = useTaskContext();
    const [toDoTasks,setToDoTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);


    
    // const [taskAdmin, setAdminTask] = useState([]);

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

    console.log(admin);  
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

export default HomeAdmin
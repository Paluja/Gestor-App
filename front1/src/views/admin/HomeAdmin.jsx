
import { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useAuth } from '../../hooks/AuthAdminContext';
import { useTaskContext } from '../../hooks/TasksContext';
import { useAuthUser } from '../../hooks/UserContext';
import { Link } from 'react-router-dom';
function HomeAdmin() {
    const { admin } = useAuth();
    const { getAllUsers } = useAuthUser();
    const {getToDoTasks,getCompletedTasks,getPendingTasks } = useTaskContext();
    const [users, setUsers] = useState([]);
    const [toDoTasks,setToDoTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    
    console.log('admin',admin);
    const changeTaskstatusVerified = async (id_task) => {
      
      try {
        const response = await fetch(`http://localhost:3000/tasks/update-task/${id_task}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ verified: 1 })
        });
        if (response.ok) {
          setPendingTasks(prevTasks => prevTasks.filter(task => task.id_tasks !== id_task));
          setCompletedTasks(prevTasks => [
            ...prevTasks,
            ...pendingTasks.filter(task => task.id_tasks === id_task).map(task => ({ ...task, verified: 1 }))
          ]);
        }
      } catch (error) {
        console.error('Error updating task', error);
      }
    }

    const addPoints = async (id_task, id_user) => {
      try {
        const response = await fetch(`http://localhost:3000/awards/achive-awards`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_task:id_task, id_user:id_user })
        });
        if (response.ok) {
          return (true,'Puntos anyiadios');
        }
      } catch (error) {
        console.error('Error updating task', error);
      }
    }

    const handleAddPoints = async (id_task, id_user) => {
      await changeTaskstatusVerified(id_task);
      await addPoints(id_task, id_user);
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

    const revokePoints = async (id_task, id_user) => {
      try {
        const response = await fetch(`http://localhost:3000/awards/revoke-awards`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_task:id_task, id_user:id_user })
        });
        if (response.ok) {
          return (true,'Puntos revokados');
        }
      } catch (error) {
        console.error('Error updating task', error);
        
      }
    }

    const handleRevokePoints = async (id_task, id_user) => {
      await revokeVerifiedTask(id_task);
      await revokePoints(id_task, id_user);
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
            {/* {admin.map((admin) => (
                <h2 key={admin.id}>Welcome {admin.name}</h2>
            ))} */}
          

        <div className="awards-container">
          <h2>Premios por conseguir</h2>
          <div className="awards-container">
            <div className="awards-bx">
              <div className="award-card">
                <h4>Nombre del premio</h4>
                <p>Descripcion del premio</p>
                <ProgressBar now={60} />
              </div>
            </div>
          </div>
          
        
        
        </div>
        <div className="tasks-container">
        <h2>Tasks</h2>
        <div className="tasks-bx">
          
          <div className="tasks-todo">
            <h4>ToDo</h4>
            <ul>
              {toDoTasks.length > 0 ? toDoTasks.map((task) => (
                <li key={task.id} className='tasks-card'>
                  <div className="task-content">
                    <h4 className='task-title'>{task.name}</h4>
                    <p className='task-description'>{task.description}</p>
                  </div>
                  <div className="btn_pts">
                    <p>{task.points} pts</p>
                    <Link to={'edit-task/'+task.id_tasks}>
                      <button className='btn-task'>edit</button>
                    </Link>
                  </div>
                </li>
              )) : <h4>No hay tareas por hacer</h4>}
            </ul>
          </div>
       

          <div className="tasks-pending">
            <h4>Pending</h4>
            <ul>
              {pendingTasks.length > 0 ? pendingTasks.map((task) => (
                <li key={task.id_tasks} className='tasks-card'>
                  <div className="task-content">
                    <h4 className='task-title'>{task.name}</h4>
                    <p className='task-description'>{task.description}</p>
                  </div>
                  <div className="btn_pts">
                    <p>{task.points} pts</p>
                    <button className='btn-task' onClick={()=> handleAddPoints(task.id_tasks,task.id_user)}>check</button>
                  </div>
                </li>
              )) : <h4>No hay tareas por verificar</h4>}
            </ul>
          </div>

          <div className="tasks-completed">
            <h4>Completed</h4>
            <ul>
              {completedTasks.length > 0 ? completedTasks.map((task) => (
                <li key={task.id_tasks} className='tasks-card'>
                <div className="task-content">
                  <h4 className='task-title'>{task.name}</h4>
                  <p className='task-description'>{task.description}</p>
                </div>
                <div className="btn_pts">
                  <p>{task.points} pts</p>
                  <button className="btn-task" onClick={() => handleRevokePoints(task.id_tasks,task.id_user)}>Revoke</button>
                </div>
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
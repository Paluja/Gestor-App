import { useEffect, useState } from 'react';
import { useAuthUser } from '../../hooks/UserContext';
import { useAuth } from '../../hooks/AuthAdminContext';
import { useTaskContext } from '../../hooks/TasksContext';
import ProgressBar from '../../components/ProgressBar';
import { useAwardContext } from '../../hooks/AwardContext';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3000');

function HomeUser() {
  const { user } = useAuthUser();
  const { getUserTasks } = useTaskContext();
  const { getUnachivedAwards } = useAwardContext();
  const [toDoTasks, setToDoTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [awards, setAwards] = useState([]);
  
  const fetchTasks = async () => {
    try {
      const data = await getUserTasks(user[0].id_users);
      setToDoTasks(data.filter((task) => task.verified === 0 && task.done === 0));
      setPendingTasks(data.filter((task) => task.verified === 0 && task.done === 1));
      setCompletedTasks(data.filter((task) => task.verified === 1 && task.done === 1));
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:3000');
    // Escucha el evento 'taskAdded' para actualizar las tareas en tiempo real
    socket.on('taskAdded', (task) => {
      // Actualiza el estado para reflejar la nueva tarea añadida
      setToDoTasks(prevTasks => [...prevTasks, task]);
    });

    // Limpia la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, [])

  useEffect(() => {
    fetchTasks();
  }, [user]);

  useEffect(() => {
    const socket = io('http://localhost:3000');  // Asegúrate de que esta URL coincida con la de tu servidor

    // Escucha el evento 'awardAdded' para actualizar los premios en tiempo real
    socket.on('awardAdded', (newAward) => {
      // Actualiza el estado para reflejar el nuevo premio añadido
      setAwards(prevAwards => [...prevAwards, newAward]);
    });

    // Limpia la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, []);

  const changeTaskStatusDone = async (id) => {
    console.log('changeTaskStatusDone', id);
    try {
      const response = await fetch(`http://localhost:3000/tasks/update-task/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: 1 }),
      });
      if (response.ok) {
        setToDoTasks((prevTasks) => prevTasks.filter((task) => task.id_tasks !== id));
        setPendingTasks((prevTasks) => [
          ...prevTasks,
          ...toDoTasks
            .filter((task) => task.id_tasks === id)
            .map((task) => ({ ...task, done: 1 })),
        ]);
        socket.emit('updateTask');
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  };



  useEffect(() => {
    fetchTasks();
  }, [user, getUserTasks]);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const data = await getUnachivedAwards();
        setAwards(data);
      } catch (error) {
        console.error('Error fetching awards', error);
      }
    };
    fetchAwards();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    
    socket.on('updateTask', async () => {
      const data = await getUnachivedAwards();
      const dataTasks = await getUserTasks(user[0].id_users);
      setToDoTasks(dataTasks.filter((task) => task.verified === 0 && task.done === 0));
      setPendingTasks(dataTasks.filter((task) => task.verified === 0 && task.done === 1));
      setCompletedTasks(dataTasks.filter((task) => task.verified === 1 && task.done === 1));
      setAwards(data);
      
    });

    // Desconecta el socket al desmontar el componente
    return () => {
        socket.disconnect();
    };
}, []);

  return (
    <>
      
      <div className='principalTitle' key={user[0].id}>
        <h1>Bienvenido</h1>
        <span>{user[0].name}</span>
      </div>
      

      <div className="awards-container">
        <h2>Premios por conseguir</h2>
        <div className="awards-bx">
          {awards.length > 0 ? (
            awards.map((award) => (
              <div key={award.id_award} className="awards-card">
                <div className="award-content">
                  <h4 className="award-title">{award.name}</h4>
                  <p className="award-points">
                    {award.total_points} / {award.points_earned}
                  </p>
                </div>
                <div className="progressBar-bx">
                  <ProgressBar
                    progress={
                      award.points_earned / award.total_points * 100
                        ? Math.floor((award.points_earned / award.total_points) * 100)
                        : 0
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <h4>No hay premios disponibles</h4>
          )}
        </div>
      </div>

      <div className="tasks-container">
        <h2>Tareas</h2>
        <div className="tasks-bx">
          <div className="tasks-todo">
            <h4>Por hacer</h4>
            <ul>
              {toDoTasks.length > 0 ? (
                toDoTasks.map((task) => (
                  <li key={task.id} className="tasks-card">
                    <div className="task-content">
                      <h4 className="task-title">{task.name}</h4>
                      <p className="task-description">{task.description}</p>
                    </div>
                    <div className="btn_pts">
                      <p>{task.points} pts</p>
                      <button className='btn-task' onClick={() => changeTaskStatusDone(task.id_tasks)}>Done</button >
                    </div>
                  </li>
                ))
              ) : (
                <h4>No hay tareas por hacer</h4>
              )}
            </ul>
          </div>

          <div className="tasks-pending">
            <h4>Por verificar</h4>
            <ul>
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => (
                  <li key={task.id_tasks} className="tasks-card">
                    <div className="task-content">
                      <h4 className="task-title">{task.name}</h4>
                      <p className="task-description">{task.description}</p>
                    </div>
                    <div className="btn_pts">
                      <p>{task.points} pts</p>
                    </div>
                  </li>
                ))
              ) : (
                <h4>No hay tareas por verificar</h4>
              )}
            </ul>
          </div>

          <div className="tasks-completed">
            <h4>Completadas</h4>
            <ul>
              {completedTasks.length > 0 ? (
                completedTasks.slice(0, 5).map((task) => (
                  <li key={task.id_tasks} className="tasks-card">
                    <div className="task-content">
                      <h4 className="task-title">{task.name}</h4>
                      <p className="task-description">{task.description}</p>
                    </div>
                    <div className="btn_pts">
                      <p>{task.points} pts</p>
                    </div>
                  </li>
                ))
              ) : (
                <h4>No hay tareas completadas</h4>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeUser;

import { useEffect, useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import { useTaskContext } from '../../hooks/TasksContext';
import { useAuthUser } from '../../hooks/UserContext';
import { useAwardContext } from '../../hooks/AwardContext';
import '../../../public/css/progressBar.css';
import { Link } from 'react-router-dom';

function HomeAdmin() {
  const { getAllUsers } = useAuthUser();
  const { getToDoTasks, getCompletedTasks, getPendingTasks } = useTaskContext();
  const { getUnachivedAwards } = useAwardContext();
  const [users, setUsers] = useState([]);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [awards, setAwards] = useState([]);

  const changeTaskstatusVerified = async (id_task) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/update-task/${id_task}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verified: 1 }),
      });
      if (response.ok) {
        setPendingTasks((prevTasks) => prevTasks.filter((task) => task.id_tasks !== id_task));
        setCompletedTasks((prevTasks) => [
          ...prevTasks,
          ...pendingTasks.filter((task) => task.id_tasks === id_task).map((task) => ({ ...task, verified: 1 })),
        ]);
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const addPoints = async (id_task, id_user) => {
    try {
      const response = await fetch(`http://localhost:3000/awards/achive-awards`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_task: id_task, id_user: id_user }),
      });
      if (response.ok) {
        // Fetch updated awards after adding points
        const updatedAwards = await getUnachivedAwards();
        setAwards(updatedAwards);
        console.log('Puntos añadidos');
      }
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleAddPoints = async (id_task, id_user) => {
    await changeTaskstatusVerified(id_task);
    await addPoints(id_task, id_user);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
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
    };
    fetchTasks();
  }, [getToDoTasks, getCompletedTasks, getPendingTasks]);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const data = await getUnachivedAwards();
        if (data) setAwards(data);
      } catch (error) {
        console.error('Error fetching awards', error);
      }
    };
    fetchAwards();
  }, [getUnachivedAwards]);

  return (
    <>
      <h1>HomeAdmin</h1>

      <div className="awards-container">
        <h2>Premios por conseguir</h2>
        <div className="awards-bx">
          {awards.length > 0 ? (
            awards.map((award) => (
              <div key={award.id_award} className="awards-card">
                <div className="award-content">
                  <h4 className="award-title">{award.name}</h4>
                  <p className="award-points">{award.points_earned} / {award.total_points}</p>
                </div>
                <div className="progressBar-bx">
                  <ProgressBar
                    progress={Math.floor((award.points_earned / award.total_points) * 100) || 0}
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
                      <Link to={`edit-task/${task.id_tasks}`}>
                        <button className="btn-task">edit</button>
                      </Link>
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
                      <button className="btn-task" onClick={() => handleAddPoints(task.id_tasks, task.id_user)}>check</button>
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

export default HomeAdmin;

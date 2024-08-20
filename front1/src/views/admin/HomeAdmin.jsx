
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthAdminContext';

function HomeAdmin() {
    const { admin } = useAuth();
    const [tasks, setTasks] = useState([]);
    // const [taskAdmin, setAdminTask] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000/tasks/all');
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                }
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        }
        fetchTasks();
    }, []);

    console.log(admin);  
    return (
        <>
            <h1>HomeAdmin</h1>
            {admin.map((admin) => (
                <h2 key={admin.id}>Welcome {admin.name}</h2>
            ))}
            
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
            {/* <h2>Task added by {admin.name}</h2>
            <ul>
                {taskAdmin.map((task) => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul> */}
        </>
    )
}

export default HomeAdmin
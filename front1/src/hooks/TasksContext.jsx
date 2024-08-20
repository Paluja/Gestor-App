import  { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const TaskContext = createContext({});

export const useTaskContext = () => {
    return useContext(TaskContext);
};


export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(null);
    const [adminTasks, setAdminTasks] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(null);
    const [pendingTasks, setPendingTasks] = useState(null);


    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/tasks/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                setTasks(data);
                console.log('Tasks retrieved successfully');
            } else {
                console.error('Failed to retrieve tasks');
            }
        } catch (error) {
            console.error('Error retrieving tasks:', error);
        }
    }

    const getUserTasks = async (id) => {
        try {
            console.log('id:', id);
            const response = await fetch(`http://localhost:3000/tasks/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to retrieve user tasks');
            }
        } catch (error) {
            console.error('Error retrieving user tasks:', error);
        }
    }

   const getPendingTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/tasks/pending', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                setPendingTasks(data);
                console.log('Pending tasks retrieved successfully');
            } else {
                console.error('Failed to retrieve pending tasks');
            }
        } catch (error) {
            console.error('Error retrieving pending tasks:', error);
        }
    }

    const getToDoTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/tasks/to-do', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                // setUserTasks(data);
                console.log('To-do tasks retrieved successfully');
            } else {
                console.error('Failed to retrieve to-do tasks');
            }
        } catch (error) {
            console.error('Error retrieving to-do tasks:', error);
        }
    }

    const getCompletedTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/tasks/completed', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                setCompletedTasks(data);
                console.log('Completed tasks retrieved successfully');
            } else {
                console.error('Failed to retrieve completed tasks');
            }
        } catch (error) {
            console.error('Error retrieving completed tasks:', error);
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, adminTasks, getCompletedTasks, pendingTasks, getTasks, getUserTasks, getPendingTasks, getToDoTasks }}>
            {children}
        </TaskContext.Provider>
    )
}
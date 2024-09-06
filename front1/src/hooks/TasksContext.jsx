import  { createContext, useContext} from 'react';
// import { useNavigate } from 'react-router-dom';

const TaskContext = createContext({});

export const useTaskContext = () => {
    return useContext(TaskContext);
};


export const TaskProvider = ({ children }) => {
    // const [adminTasks, setAdminTasks] = useState([]);

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
                console.log('Tasks retrieved successfully');
                return(data);
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
                console.log('Pending tasks retrieved successfully');
                return(data);
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
                console.log('To-do tasks retrieved successfully');
                return(data);
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
                console.log('Completed tasks retrieved successfully');
                return(data);
            } else {
                console.error('Failed to retrieve completed tasks');
            }
        } catch (error) {
            console.error('Error retrieving completed tasks:', error);
        }
    }


    const getTaskById = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log('Task retrieved successfully');
                return(data);
            } else {
                console.error('Failed to retrieve task');
            }
        } catch (error) {
            console.error('Error retrieving task:', error);
        }
    }


    return (
        <TaskContext.Provider value={{ getCompletedTasks, getTasks, getUserTasks, getPendingTasks, getToDoTasks, getTaskById}}>
            {children}
        </TaskContext.Provider>
    )
}
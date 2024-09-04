import { useParams } from 'react-router-dom';
import { addTaskSchema } from '../../formUtils/formSchema';
import Input from '../../formUtils/Input';
import { Form, Formik } from 'formik';
import Select from '../../formUtils/Select';
import { useAuthUser } from '../../hooks/UserContext';
import { useEffect, useState } from 'react';

function EditTask() {
    const { id } = useParams();
    const { getAllUsers } = useAuthUser();
    const [task, setTask] = useState(null);
    const [users, setUsers] = useState([]);

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
                setTask(data);
            } else {
                console.error('Failed to retrieve task');
            }
        } catch (error) {
            console.error('Error retrieving task:', error);
        }
    };

    const handleSubmit = async (values, actions) => {
        const updatedTask = {
            name: values.name || task.name,
            description: values.description || task.description,
            user_id: values.userId || task.userId,
            points: values.points || task.points,
            id_admin: task.id_admin,
            verified: task.verified,
            done: task.done,
        };
        console.log('updatedTask',updatedTask);

        try {
            const response = await fetch(`http://localhost:3000/tasks/update-task/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            if (response.status === 200) {
                console.log('Task updated successfully');
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
        actions.resetForm();
    };

    useEffect(() => {
        getTaskById(id);
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error getting users:', error);
            }
        };
        fetchUsers();
    }, [getAllUsers]);

    if (!task) return <div>Loading...</div>; // Maneja la carga inicial

    const initialEditTaskValues = {
        name: task.name,
        description: task.description,
        userId: task.userId,
        points: task.points,
    };

    return (
        <Formik
            initialValues={initialEditTaskValues}
            onSubmit={handleSubmit}
            enableReinitialize={true} // Habilita reinitialización de valores
        >
            {({ isSubmitting }) => (
                <Form>
                    <Input label="Task" type="text" id="name" name="name" />
                    <Input label="Description" type="text" id="description" name="description" />
                    <Select label="Member" id="userId" name="userId">
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id_users} value={user.id_users}>{user.name}</option>
                        ))}
                    </Select>
                    <Input label="Points" type="number" id="points" name="points" />
                    <button disabled={isSubmitting} type="submit">Edit Task</button>
                </Form>
            )}
        </Formik>
    );
}

export default EditTask;

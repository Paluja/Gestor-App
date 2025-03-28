import { useState, useEffect } from 'react'
import { useAuthUser } from '../../hooks/UserContext'
import { Formik } from 'formik';
import { initialAddTaskValues } from '../../formUtils/formValues';
import { addTaskSchema } from '../../formUtils/formSchema';
import Input from '../../formUtils/Input';
import { Form } from 'formik';
import Select from '../../formUtils/Select';
import { useAuth } from '../../hooks/AuthAdminContext';

function AddTasks() {
    const [users, setUsers] = useState([]);
    const { getAllUsers } = useAuthUser();
    const { jwtAdmin } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setUsers(await getAllUsers());
            } catch (error) {
                console.error('Error getting users:', error);
            }
        }
        fetchUsers();
    }, [getAllUsers]);
    
    const handleSubmit = async (values, actions) => {
        const task = {
            name: values.name,
            description: values.description,
            user_id: values.userId,
            points: values.points,
        }
        try {
            const response = await fetch('http://localhost:3000/tasks/add-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwtAdmin,
                },
                body: JSON.stringify(task),
            });
            if (response.status === 200) {
                console.log('Task added successfully');
            } else {
                console.error('Failed to add task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
        actions.resetForm();
    }
  
    return (
    <>
    <h2 className='title-formAward'>Añadir nueva tarea</h2>
    <Formik
        initialValues={initialAddTaskValues}
        onSubmit={handleSubmit}
        validationSchema={addTaskSchema}
        >
            {({ isSubmitting }) => (
                <Form>
                    
                    <Input label="Tarea" placeholder="Nombre de la tarea" type="text" id="name" name="name" required />
                    
                    <Input label="Descripción" placeholder='Descripción de la tarea'  type="text" id="description" name="description" required />
                    
                    <Select label="Selecciona un miembro" id="userId" name="userId" required>
                        <option value="">Miembros</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id_users}>{user.name}</option>
                        ))}
                    </Select>
                    <Input label="Puntos" type="number" id="points" name="points" placeholder='Puntos de la tarea' required />
                    <button className='btn-task' disabled={isSubmitting} type="submit">Añadir</button>
                </Form>
            )}
    </Formik>
    </>
  )
}

export default AddTasks
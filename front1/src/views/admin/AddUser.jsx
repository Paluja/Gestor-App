import React from 'react'
import { Formik, Form } from 'formik'
import { initialRegisterValues } from '../../formUtils/formValues'
import Input from '../../formUtils/Input'
import { useAuth } from '../../hooks/AuthAdminContext'
import { useEffect, useState } from 'react'
function AddUser() {
    const { registerUser } = useAuth();
    
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/all');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
   
    
    console.log(users);
    const onSubmit = async (values, actions) => {
        await registerUser(values.name, values.password);
        actions.resetForm();
        fetchUsers();
    }
  
    return (
      <>
        <div className="members-container">
          
          <h1 className='title'>Miembros</h1>
          
          <div className="members-layout">
            <ul>
              {users.map((user) => (
                <li className='member-card' key={user.id}>
                  <div className="content">
                    <h3 className='name'>{user.name}</h3>
                    <p className='points'>Puntos totales: {user.points}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className='title-addMember'>Añadir miembro</h2>
        <Formik
          initialValues={initialRegisterValues}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='form-addMember'>
              <Input label="Nombre" name='name' type='text' placeholder='Name' required/>
              <Input label="Contraseña" name='password' type='password' placeholder='Password' required/>
              <button className='btn-task' disabled={isSubmitting} type='submit'>Añadir</button>
            </Form>
          )}
        </Formik>
      </>
  )
}

export default AddUser
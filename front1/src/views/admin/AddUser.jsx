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
   
    

    const onSubmit = async (values, actions) => {
        await registerUser(values.name, values.password);
        actions.resetForm();
        fetchUsers();
    }
  
    return (
      <>
        <div className="members-container">
          <h1>Members</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>


        <Formik
          initialValues={initialRegisterValues}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Input label="name" name='name' type='text' placeholder='Name' required/>
              <Input label="password" name='password' type='password' placeholder='Password' required/>
              <button disabled={isSubmitting} type='submit'>Add Member</button>
            </Form>
          )}
        </Formik>
      </>
  )
}

export default AddUser
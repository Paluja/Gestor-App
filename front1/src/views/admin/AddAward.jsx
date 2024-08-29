import { useState, useEffect, useReducer } from 'react'
import { useAuthUser } from '../../hooks/UserContext'
import { Formik } from 'formik';
import { initialAddAwardValues } from '../../formUtils/formValues';
import { addAwardSchema } from '../../formUtils/formSchema';
import Input from '../../formUtils/Input';
import { Form } from 'formik';
import { useAuth } from '../../hooks/AuthAdminContext';

function AddAward() {
  const { admin } = useAuth();
  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch('http://localhost:3000/awards/add-award', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          total_points: values.total_points,
          id_admin: admin[0].id_admin
        })
      });
      if (response.status == 200){
        console.log('Award added successfully');
      } else {
        console.error('Failed to add award');
      }
    } catch (error) {
      console.error('Error adding award:', error);
    }
    actions.resetForm();
  }

  return (
    <>
      <h1>Add Award</h1>
      <Formik
        initialValues={initialAddAwardValues}
        onSubmit={handleSubmit}
        validationSchema={addAwardSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Input label="Name" name="name" type="text" required/>
            <Input label="Description" name="description" type="text" required />
            <Input label="Total Points" name="total_points" type="number" required />
            <button type="submit" disabled={isSubmitting}>
              Add Award
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AddAward
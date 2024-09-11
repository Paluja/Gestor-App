import {Formik, Form} from 'formik'
import { initialLoginAdminValues } from '../../formUtils/formValues'
import Input from '../../formUtils/Input'
import { useAuth } from '../../hooks/AuthAdminContext'
import { useNavigate } from 'react-router-dom'



function LoginAdmin() {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();
  
  const onSubmit = async (values, actions) => {
    await loginAdmin(values.email, values.password);
    navigate('/admin');
    actions.resetForm();
  }

  return (
      <Formik 
        initialValues={initialLoginAdminValues}
        onSubmit={onSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <Input label="Email" name='email' type='text' placeholder='Email' />
            <Input label="Contraseña" name='password' type='password' placeholder='Contraseña' required />
            <button className='btn-task' disabled={isSubmitting} type='submit'>Login</button>
          </Form>
        )}
      </Formik>
  )

}

export default LoginAdmin
import { Formik, Form} from 'formik'
import { initialRegisterValues } from '../../formUtils/formValues'
import Input from '../../formUtils/Input'
import { useAuth } from '../../hooks/AuthAdminContext'
import { useNavigate } from 'react-router-dom'

function RegisterAdmin() {
    const { registerAdmin } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        console.log('values',values.name,values.password,values.email);
        await registerAdmin(values.name, values.password, values.email);
        navigate('/admin/login');
        actions.resetForm();
    }


    return (
        <Formik
            initialValues={initialRegisterValues}
            onSubmit={onSubmit}
            >
            {({isSubmitting}) => (
                <Form>
                    <Input label="name" name='name' type='text' placeholder='Name' required/>
                    <Input label="email" name='email' type='email' placeholder='Email' required />
                    <Input label="password" name='password' type='password' placeholder='Password' required/>
                    <Input label="acceptedTc" name='acceptedTc' type='checkbox' placeholder='Accepted Terms and Conditions' required/>
                    <button disabled={isSubmitting} type='submit'>Register</button>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterAdmin
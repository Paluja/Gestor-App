import { Formik, Form} from 'formik'
import { initialRegisterValues } from '../../formUtils/formValues'
import Input from '../../formUtils/Input'
import { useAuth } from '../../hooks/AuthContext'

function Register() {
    const { registerAdmin } = useAuth();
    const onSubmit = async (values, actions) => {
        await registerAdmin(values);
        actions.resetForm();
    }


    return (
        <Formik
            initialValues={initialRegisterValues}
            onSubmit={onSubmit}
            >
            {({isSubmitting}) => (
                <Form>
                    <Input label="name" name='name' type='text' placeholder='Name' />
                    <Input label="email" name='email' type='text' placeholder='Email' />
                    <Input label="password" name='password' type='text' placeholder='Password' />
                    <Input label="acceptedTc" name='acceptedTc' type='checkbox' placeholder='Accepted Terms and Conditions'/>
                    <button disabled={isSubmitting} type='submit'>Register</button>
                </Form>
            )}
        </Formik>
    )
}

export default Register
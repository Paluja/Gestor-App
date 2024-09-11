import { Formik, Form} from 'formik'
import { initialRegisterValues } from '../../formUtils/formValues'
import Input from '../../formUtils/Input'
import { useAuth } from '../../hooks/AuthAdminContext'
import { useState } from 'react'

function RegisterAdmin() {
    const { registerAdmin } = useAuth();
    const [error, setError] = useState(false);
    const [badEmail, setBadEmail] = useState(false);
    
    const onSubmit = async (values, actions) => {
        const data = await registerAdmin(values.name, values.password, values.email);
        
        if (data === false ) setError(true);
        if (data === undefined) setBadEmail(true);
        actions.resetForm();
    }


    return (
        <Formik
            initialValues={initialRegisterValues}
            onSubmit={onSubmit}
            >
            {({isSubmitting}) => (
                <Form>
                    <Input label="Nombre" name='name' type='text' placeholder='Nombre' required/>
                    <Input label="Email" name='email' type='email' placeholder='Email' required />
                    <Input label="Contraseña" name='password' type='password' placeholder='Contraseña' required/>
                    {/* anyadir un label con las pautas para la contrasenya y debajo ponerle el confirm password */}
                    
                    <button className='btn-task' disabled={isSubmitting} type='submit'>Register</button>
                    {error && <p>The password must have 8 chars, 1 mayus, 1 number and 1 specia character</p>}
                    {badEmail && <p>Email already in use</p>}
                </Form>
            )}
        </Formik>
    )
}

export default RegisterAdmin
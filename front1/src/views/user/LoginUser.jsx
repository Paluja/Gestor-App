import { Formik,Form } from "formik";
import { initialLoginUserValues } from "../../formUtils/formValues";
import Input from "../../formUtils/Input";
import { useAuthUser } from "../../hooks/UserContext";
import { useNavigate } from "react-router-dom";


function LoginUser() {
    const { loginUser} = useAuthUser();
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        await loginUser(values.name, values.password);
        actions.resetForm();
        navigate('/user');
    }

    return (
      <Formik 
        initialValues={initialLoginUserValues}
        onSubmit={onSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <Input label="Nombre" name='name' type='text' placeholder='Nombre' />
            <Input label="Contraseña" name='password' type='password' placeholder='Contraseña' required/>
            <button className="btn-task" disabled={isSubmitting} type='submit'>Login</button>
          </Form>
        )}
      </Formik>
  )

}

export default LoginUser
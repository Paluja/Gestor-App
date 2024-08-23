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
            <Input label="name" name='name' type='text' placeholder='Name' />
            <Input label="password" name='password' type='text' placeholder='Password' />
            <button disabled={isSubmitting} type='submit'>Login</button>
          </Form>
        )}
      </Formik>
  )

}

export default LoginUser
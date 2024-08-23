/* eslint-disable react/prop-types */
import {useField} from 'formik';

function Select({label, children, ...props}) {
    const [field, meta] = useField(props);
  return (
   <>
   <label>{label}</label>
   <select {...field} {...props}
     className={meta.touched && meta.error ? "input-error" : ""}
   >
    {children}
   </select>
   {meta.touched && meta.error && <div className="error">{meta.error}</div>}
   </>
  )
}

export default Select
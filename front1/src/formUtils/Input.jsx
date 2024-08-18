import React from 'react';
import { Field, ErrorMessage } from 'formik';

const Input = ({ label, name, type, placeholder }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} type={type} placeholder={placeholder} />
            <ErrorMessage name={name} component="div" />
        </div>
    );
};

export default Input;
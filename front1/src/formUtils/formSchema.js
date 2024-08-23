import * as yup from 'yup';

export const loginAdminSchema = yup.object().shape({
    email: yup.string().email("Enter your email").required("Email is required"),
    password: yup.string().min(8).required("Password is required").matches(),
});

export const registerAdminSchema = yup.object().shape({
    name: yup.string().min(3).required("Name is required"),
    email: yup.string().email("Enter your email").required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
    acceptedTc: yup.boolean().oneOf([true], "Accept Terms & Conditions is required")
});

export const loginUserSchema = yup.object().shape({
    name: yup.string().min(3).required("Name is required"),
    password: yup.string().min(8).required("Password is required")
});

export const addTaskSchema = yup.object().shape({
    name: yup.string().min(3).required("Name is required"),
    description: yup.string().min(3).required("Description is required"),
    userId: yup.number().required("User is required"),
    points: yup.number().required("Points is required")
});
import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import React, { useContext, useState } from "react";
import { firebaseContext } from "../../context/firebase/firebaseContext";
import { modalContext } from "../../context/Modal/modalContext";
import styles from '../../styles/Modal.module.scss'

interface Values {
    name: string;
    email: string;
    password: string;
    password2: string;
}

export const ModalRegister: React.FC = () => {

    const handleModalDialogClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
    }

    const { userRegister } = useContext(firebaseContext)
    const { handleOpenModal, setModal } = useContext(modalContext)
    const [errors, setErrors] = useState<String>("")

    const handleRegister = (values: Values, actions: any) => {
        setErrors("")
        userRegister(values.name, values.email, values.password)
        .then(() => {
            handleOpenModal()
            actions.setSubmitting(false);
            actions.resetForm();
            setModal("login")
        })
        .catch(res => {
            actions.setSubmitting(false);
            if(res === "Firebase: Error (auth/email-already-in-use)."){
                return setErrors("Email already in use")
            }
            setErrors(res)
        })
    }

    const validateForm = (values: Values) => {
        const errors: FormikErrors<FormikValues> = {};
        if (!values.name) {
            errors.name = 'Name is required';
        }else if (values.name.length < 6) {
            errors.name = 'Min 6 characters';  
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        if (values.password.length < 6){
            errors.password = 'Min 6 characters';  
        }
        if(values.password !== values.password2){
            errors.password2 = 'Passwords do not match';  
        }
        return errors;
    }

    return (
        <div className={styles.container} onClick={handleModalDialogClick}>
            <Formik
                initialValues={{name: "", email: "", password: "", password2: "" }}
                validate={validateForm}
                onSubmit={handleRegister}
                >
                {({isSubmitting}) => (
                    <Form className={styles.authContainer}>
                        <h1>Register</h1>
                        <Field name="name" placeholder="Name"/>
                        <ErrorMessage name="name" component="p"/>
                        <Field name="email" placeholder="Email"/>
                        <ErrorMessage name="email" component="p"/>
                        <Field name="password" placeholder="Password" type="Password"/>
                        <ErrorMessage name="password" component="p"/>
                        <Field name="password2" placeholder="Repeat password" type="Password"/>
                        <ErrorMessage name="password2"  component="p"/>
                        <button type="submit" disabled={isSubmitting}>Register</button>
                        <h6 onClick={() => setModal("login")}>I have an account</h6>
                    </Form>
                )}
            </Formik>
            <p>{errors}</p>
        </div>
    )
}
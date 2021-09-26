import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikValues } from "formik";
import React, { useContext, useState } from "react";
import { firebaseContext } from "../../context/firebase/firebaseContext";
import { modalContext } from "../../context/Modal/modalContext";
import styles from '../../styles/Modal.module.scss'

interface Values {
    email: string;
    password: string;
}

export const ModalLogin: React.FC = () => {

    const handleModalDialogClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
    }

    const { loginUser } = useContext(firebaseContext);
    const { handleOpenModal, setModal } = useContext(modalContext)

    const [errors, setErrors] = useState<String>("")

    const handleLogin = (values: Values, actions: any) => {
        setErrors("")
        loginUser(values.email, values.password)
        .then(() => {
            actions.setSubmitting(false);
            actions.resetForm();
            handleOpenModal(false)
        })
        .catch((err:string) => {
            actions.setSubmitting(false);
            setErrors(err)
        })
    }

    const validateForm = (values: Values) => {
        const errors: FormikErrors<FormikValues> = {};
        if (!values.email) {
            errors.email = 'Name is required';
        }
        if (!values.password) {
            errors.password = 'Name is required';
        }
        return errors;
    }

    return (
        <div className={styles.container} onClick={handleModalDialogClick}>
            <Formik
                initialValues={{email: "", password: ""}}
                validate={validateForm}
                onSubmit={handleLogin}
                >
                {({isSubmitting}) => (
                    <Form className={styles.authContainer}>
                        <h1>Login to view content</h1>
                        <Field name="email" placeholder="Email"/>
                        <ErrorMessage name="email" component="p"/>
                        <Field name="password" placeholder="Password" type="Password"/>
                        <ErrorMessage name="password" component="p"/>
                        <button type="submit" disabled={isSubmitting}>Login</button>
                        <h6 onClick={() => setModal("register")}>I do not have an account</h6>
                    </Form>
                )}
            </Formik>
            <p>{errors}</p>
        </div>
    )
}

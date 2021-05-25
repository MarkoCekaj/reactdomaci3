import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { authorities, register } from '../../services/account';
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Register = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("email is required !").email("Email is invalid"),
        login: Yup.string().required("login is required !"),
        password: Yup.string().required("password is required").min(6, "Password must be at least 6 chars").max(15, "Password can be max 15 chars")
    })
    const formOptions = { resolver: yupResolver(validationSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState

    const history = useHistory()
    const [registerData, setRegisterData] = useState({
        email: "",
        login: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        register(registerData).then(function (response) {
            console.log(response);
            history.push("/")
        })
            .catch(function (error) {
                console.log(error?.response?.data);
                if (error?.response?.data?.message === "error.userexists") {
                    setErrorMessage("user exists");
                }
                else {
                    setErrorMessage("error")
                }
            })

    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email')}
                    placeholder="Enter email"
                    value={registerData?.email}
                    onChange={(e) => {
                        setRegisterData((prevState) => {
                            return {
                                ...prevState,
                                email: e.target.value,
                            };
                        });
                    }}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                    type="text"
                    name="login"
                    {...register('login')}
                    placeholder="Enter login"
                    value={registerData?.login}
                    onChange={(e) => {
                        setRegisterData((prevState) => {
                            return {
                                ...prevState,
                                login: e.target.value,
                            };
                        });
                    }}
                />
                <div className="invalid-feedback">{errors.login?.message}</div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    type="password"
                    name="password"
                    {...register('password')}
                    placeholder="Enter password"
                    value={registerData?.password}
                    onChange={(e) => {
                        setRegisterData((prevState) => {
                            return {
                                ...prevState,
                                password: e.target.value,
                            };
                        });
                    }}
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
        </Button>
            {errorMessage}
        </Form>
    )
}

export default Register;
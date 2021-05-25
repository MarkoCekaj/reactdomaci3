import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { authorities, register } from '../../services/account';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Register = () => {
    const history = useHistory()
    const [registerData, setRegisterData] = useState({
        email: "",
        login: "",
        password: "",
        activated: true,
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
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
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

            </Form.Group>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Register</Form.Label>
                <Form.Control
                    type="text"
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

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
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
            </Form.Group>
            <Button onClick={(e) => onSubmit(e)} variant="primary" type="submit">
                Submit
        </Button>
            {errorMessage}
        </Form>
    )
}

export default Register;
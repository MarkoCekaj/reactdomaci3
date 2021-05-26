import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { login } from "../../services/account";
import { Link } from 'react-router-dom'


const Login = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    login(loginData)
      .then(function (response) {
        console.log(response);
        console.log(response?.data["id_token"]);
        localStorage.setItem("jwt-token", response?.data["id_token"]);
        history.push("/movies");
      })
      .catch(function (error) {
        console.log(error?.reponse?.data);
        if (error?.response?.data?.detail === "Bad credentials") {
          setErrorMessage("Bad credentials");
        } else {
          setErrorMessage("Error");
        }
      });
  };
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={loginData?.username}
          onChange={(e) => {
            setLoginData((prevState) => {
              return {
                ...prevState,
                username: e.target.value,
              };
            });
          }}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={loginData?.password}
          onChange={(e) => {
            setLoginData((prevState) => {
              return {
                ...prevState,
                password: e.target.value,
              };
            });
          }}
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Remember me"
          value={loginData?.rememberMe}
          onChange={(e) => {
            setLoginData((prevState) => {
              return {
                ...prevState,
                rememberMe: e.target.value,
              };
            });
          }}
        />
        <Form.Text className="danger">{errorMessage}</Form.Text>
      </Form.Group>
      <Button onClick={(e) => onSubmit(e)} variant="primary" type="submit">
        Submit
      </Button>
      <Link to="/register">Register</Link>
    </Form>
  );
};
export default Login;

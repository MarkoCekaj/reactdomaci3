import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const isLogin = () => {
    localStorage.setItem("role", "admin");
    history.push("/books");
  };
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button onClick={() => isLogin()} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default Login;

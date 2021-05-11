import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useHistory } from "react-router-dom";
const Navigation = () => {
  const history = useHistory();
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/movies">Movies</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/books">Books</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/people">People</Link>
          </Nav.Link>

          <Nav.Link
            onClick={() => {
              localStorage.clear();
              history.push("/");
            }}
          >
            Log out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navigation;

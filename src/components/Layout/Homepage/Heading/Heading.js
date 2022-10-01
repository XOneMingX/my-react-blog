import React, { useContext } from "react";

import {
  Container,
  Navbar,
  Nav,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";

import AuthContext from "../../../store/auth-context";

const Heading = (props) => {
  const authContext = useContext(AuthContext);
  const adminAlert = () => {
    if (!authContext.isAdmin) {
      alert("You are not an admin!!");
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">My-Blog</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            href={`${authContext.isAdmin ? "/new-article" : ""}`}
            onClick={adminAlert}
          >
            NewArticle
          </Nav.Link>
        </Nav>
        <Nav className="me-auto">
          {" "}
          {authContext.isAdmin ? (
            <Nav.Link href={"/admin-manager"}>Add Admin</Nav.Link>
          ) : (
            ""
          )}
        </Nav>

        {authContext.isLoggedIn ? (
          <div>
            {authContext.userData.displayName}
            <Button variant="outline-secondary" onClick={authContext.onLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline-secondary" onClick={authContext.onLogin}>
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Heading;

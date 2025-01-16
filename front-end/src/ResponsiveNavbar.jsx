import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from "./useUser";

const ResponsiveNavbar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { isLoading, user } = useUser();

  return (
    <Navbar bg="rgb(255, 236, 206)" fixed="top" variant="light" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">
          <h2>Minekada <span className="style2">Blog</span> Page</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 nav-items">
              <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={handleClose}>About</Nav.Link>
              <Nav.Link as={Link} to="/articles" onClick={handleClose}>Articles</Nav.Link>
              <Nav.Link as={Link} to="/write-article" onClick={handleClose}>Write</Nav.Link>
              <Nav.Link as={Link} to="/create-account" onClick={handleClose}>CreateAccount</Nav.Link>
              {isLoading ? <p>loading...</p> : (
                <>
                  {user && <p>logged in as {user.email}</p>}
                  {user
                    ? <button onClick={() => {signOut(getAuth()); handleClose()}}>Sign Out</button>
                    : <button onClick={() => {navigate('/login'); handleClose()}}>Sign In</button>
                  }
                </>


              )}

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default ResponsiveNavbar;

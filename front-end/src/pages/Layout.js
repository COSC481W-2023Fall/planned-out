import { Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const Layout = () => {
  // For testing purposes: Store the backend link in localStorage 
  // so that it can be pulled from any page. This makes it so that
  // we don't have to change the backend link on every single page
  // when testing things with localhost
  let renderBackend = "https://planned-out-backend-jdx6.onrender.com/";
  let localBackend = "http://localhost:5050/"

  // Use render backend
  //localStorage.setItem("backendURL", renderBackend);
  // Use local backend
  localStorage.setItem("backendURL", localBackend);

  const navigate = useNavigate();
  const userCookie = localStorage.getItem('user');
  const [isUserLoggedIn, setLoggedIn] = useState([]);
  const [isUserLoggedOut, setLoggedOut] = useState([]);

  useEffect(() => {
    if (userCookie == null) {
      setLoggedIn(false);
      setLoggedOut(true);
      if (window.location.pathname !== "/registration") {
        navigate(`/login`);
      }
    }
    else {
      setLoggedIn(true)
      setLoggedOut(false);
    }
  }, [navigate, userCookie]);

  // Log user out
  function logUserOut() {
    localStorage.removeItem('user');
    navigate(`/login`);
  }

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/favicon-32x32.png"
              width={"32px"}
              height={"32px"}
              alt={"Planned-Out Logo"}
            />
            Planned-Out
          </Navbar.Brand>
          <Nav className="me-auto" variant="pills">
            <Nav.Item>
              <LinkContainer to="/">
                <Button className="main-nav-button">Home</Button>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/friends">
                <Button className="main-nav-button">Friends</Button>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/settings">
                <Button className="main-nav-button">Settings</Button>
              </LinkContainer>
            </Nav.Item>
            {isUserLoggedOut &&
              <Nav.Item>
                <LinkContainer to="/login">
                  <Button className="main-nav-button">Login</Button>
                </LinkContainer>
              </Nav.Item>
            }
            {isUserLoggedIn &&
              < Nav.Item >
                <LinkContainer to="/login">
                  <Button onClick={logUserOut} className="main-nav-button">Log Out</Button>
                </LinkContainer>
              </Nav.Item>
            }
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;

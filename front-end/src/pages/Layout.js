import { Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const Layout = () => {

  const userCookie = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (userCookie == null) {
        navigate(`/login`);
    }
}, []);

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
              <LinkContainer to="/">
                <Button className="main-nav-button">Stats</Button>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/">
                <Button className="main-nav-button">Friends</Button>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/settings">
                <Button className="main-nav-button">Settings</Button>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/login">
                <Button className="main-nav-button">Login</Button>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="login">
                <Button onClick={logUserOut} className="main-nav-button">Log Out</Button>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;

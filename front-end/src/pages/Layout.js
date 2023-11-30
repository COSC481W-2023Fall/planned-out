import { Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../fonts/orange juice 2.0.ttf";

const Layout = () => {
  // For testing purposes: Store the backend link in localStorage
  // so that it can be pulled from any page. This makes it so that
  // we don't have to change the backend link on every single page
  // when testing things with localhost
  let renderBackend = "https://planned-out-backend-jdx6.onrender.com/";
  let localBackend = "http://localhost:5050/";

  // Use render backend
  localStorage.setItem("backendURL", renderBackend);
  // Use local backend
  //localStorage.setItem("backendURL", localBackend);

  let link = localStorage.getItem("backendURL");

  const navigate = useNavigate();
  const userCookie = localStorage.getItem("user");
  const [isUserLoggedIn, setLoggedIn] = useState([]);
  const [isUserLoggedOut, setLoggedOut] = useState([]);

  const [profilePicture, setProfilePicture] = useState(["default"]);

  // Listen for profile_picture in localStorage
  window.addEventListener("profile_picture", () => {
    setProfilePicture(localStorage.getItem("profile_picture"));
  });

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      fetch(link + "get-profile-picture", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("user"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setProfilePicture(data["profile_picture"]);
        });
    }

    if (userCookie == null) {
      setLoggedIn(false);
      setLoggedOut(true);
      if (window.location.pathname !== "/registration") {
        navigate(`/login`);
      }
    } else {
      setLoggedIn(true);
      setLoggedOut(false);
    }
  }, [profilePicture, link, navigate, userCookie]);

  // If profile picture is null or undefined set it to default
  if (profilePicture == null || profilePicture === undefined) {
    setProfilePicture("default");
  }

  // Log user out
  function logUserOut() {
    localStorage.removeItem("user");
    navigate(`/login`);
  }

  function goToHome() {
    navigate("/");
  }

  return (
    <>
      {isUserLoggedIn &&
        <Navbar>
          <Container>
            <Navbar.Brand className="logo" onClick={goToHome}>
              Planned Out
            </Navbar.Brand>
          </Container>
          <Container className="nav-button-container">
            <Nav variant="pills">
              <Nav.Item>
                <LinkContainer to="/">
                  <Button className="main-nav-button">Tasks</Button>
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Container>
          <Container className="profile-dropdown-container">
            <NavDropdown
              align="end"
              title={
                <img
                  alt="Profile Icon"
                  className="navbar-profile"
                  src={"/avatars/" + profilePicture + ".png"}
                ></img>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                <LinkContainer to="/settings">
                  <Nav.Link className="main-nav-button">Settings</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              {isUserLoggedOut && (
                <NavDropdown.Item>
                  <LinkContainer to="/login">
                    <Nav.Link className="main-nav-button">Login</Nav.Link>
                  </LinkContainer>
                </NavDropdown.Item>
              )}
              {isUserLoggedIn && (
                <NavDropdown.Item>
                  <LinkContainer to="/login">
                    <Nav.Link onClick={logUserOut} className="main-nav-button">
                      Log Out
                    </Nav.Link>
                  </LinkContainer>
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Container>
        </Navbar>
      }
      <Outlet />
    </>
  );
};

export default Layout;

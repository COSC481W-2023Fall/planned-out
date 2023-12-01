import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme';
import { useState, useLayoutEffect } from "react";

const NavigationBar = () => {

    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useLayoutEffect(() => {
        setSelectedTheme(theme);
    }, [theme, themeLoaded]);

    const navigate = useNavigate();

    function goToHome() {
        navigate("/");
    }

    return (
        themeLoaded && <ThemeProvider theme={selectedTheme}>
            <GlobalStyles />
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
                    <Nav.Item>
                        <LinkContainer to="/friends">
                            <Button className="main-nav-button">Friends</Button>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
            </Container>
        </ThemeProvider>
    )

}

export default NavigationBar;
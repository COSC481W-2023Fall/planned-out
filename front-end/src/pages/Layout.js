import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = () => {
    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">Planned-Out</Navbar.Brand>
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
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
};

export default Layout;

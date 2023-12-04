import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SettingsSecurity from "../components/SettingsSecurity.js";
import SettingsProfile from "../components/SettingsProfile.js";
import SettingsAppearance from "../components/SettingsAppearance.js";
import SettingsPrivacy from "../components/SettingsPrivacy.js";
import "../pages/Settings.css"
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme';
import { useState, useLayoutEffect, useEffect  } from "react";


let link = localStorage.getItem("backendURL");

const Settings = () => {

    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        getUser();
      }, []);

    useLayoutEffect(() => {
        setSelectedTheme(theme);
    }, [theme, themeLoaded]);

    function getUser(){
        fetch(link + "get-friend-info", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: localStorage.getItem("user") // Gets info on user
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setName((data['firstName'] + " " + data['lastName']))
                setUsername(data.username);
            });
    }

    return (
        themeLoaded && <ThemeProvider theme={selectedTheme}>
            <GlobalStyles />
            <Container className="main-settings-container">
                <Row>
                    <Col>
                        <h2>{username}</h2>
                        <h4>{name}</h4>
                    </Col> 
                </Row>
                <Tab.Container transition={false} defaultActiveKey="security">
                    <Row>
                        <Col>
                            <Nav variant="pills" className="settings-list flex-column">
                                <Nav.Item>
                                    <Nav.Link data-testid="Security" eventKey="security">Security</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#profile" data-testid="Profile" eventKey="profile">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link data-testid="Appearance" eventKey="appearance">Appearance</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link data-testid="Privacy" eventKey="privacy">Privacy</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="security">
                                    <SettingsSecurity></SettingsSecurity>
                                </Tab.Pane>
                                <Tab.Pane eventKey="profile">
                                    <SettingsProfile></SettingsProfile>
                                </Tab.Pane>
                                <Tab.Pane eventKey="appearance">
                                    <SettingsAppearance></SettingsAppearance>
                                </Tab.Pane>
                                <Tab.Pane eventKey="privacy">
                                    <SettingsPrivacy></SettingsPrivacy>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </ThemeProvider>
    );
};

export default Settings;

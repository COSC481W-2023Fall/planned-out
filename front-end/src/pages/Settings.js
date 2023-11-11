import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SettingsSecurity from "../components/SettingsSecurity.js";
import SettingsProfile from "../components/SettingsProfile.js";
import SettingsAppearance from "../components/SettingsAppearance.js";
import SettingsPrivacy from "../components/SettingsPrivacy.js";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../pages/Settings.css"

const Settings = () => {
    const userCookie = localStorage.getItem('user');
    const navigate = useNavigate();

    useEffect(() => {
        if (userCookie == null) {
            navigate(`/login`);
        }
    })

    return (
        <Container className="main-settings-container">
            <Tab.Container transition={false} defaultActiveKey="security">
                <Row>
                    <Col>
                        <Nav variant="pills" className="settings-list flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="security">Security</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="appearance">Appearance</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="privacy">Privacy</Nav.Link>
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
    );
};

export default Settings;

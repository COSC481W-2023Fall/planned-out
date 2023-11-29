import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme';
import { useState, useLayoutEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Friends.css";
import FriendsList from "../components/FriendsList.js";
import FriendsGraph from "../components/FriendsGraph.js";
import Button from "react-bootstrap/Button";

const Friends = () => {

    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useLayoutEffect(() => {
        setSelectedTheme(theme);
    }, [theme, themeLoaded]);

    const setDateRange = (dateRange) => {
        window.localStorage.setItem("date_range", dateRange);
        window.dispatchEvent(new Event("date_range"));
    }

    return (
        themeLoaded && <ThemeProvider theme={selectedTheme}>
            <GlobalStyles />
            <div className="App">
                <Button onClick={() => setDateRange('daily')}>Daily</Button>
                <Button onClick={() => setDateRange('weekly')}>Weekly</Button>
                <Button onClick={() => setDateRange('monthly')}>Monthly</Button>
                <Button onClick={() => setDateRange('total')}>Total</Button>
                <Container>
                    <Row>
                        <Col>
                            <Card className="friends-card">
                                <Card.Title>Friends</Card.Title>
                                <FriendsList></FriendsList>
                            </Card>
                        </Col>
                        <Col sm={8}>
                            <Card className="stats-card">
                                <Card.Title>Stats</Card.Title>
                                <FriendsGraph></FriendsGraph>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default Friends;
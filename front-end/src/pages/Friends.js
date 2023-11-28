import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme';
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Friends.css";

const Friends = () => {

    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    useEffect(() => {
        setSelectedTheme(theme);
    }, [theme, themeLoaded]);

    return (
        themeLoaded && <ThemeProvider theme={selectedTheme}>
            <GlobalStyles />
            <div className="App">
                <Container>
                    <Row>
                        <Col>
                                <Card className="friends-card">
                                    <Card.Title>Friends</Card.Title>
                                </Card>
                        </Col>
                        <Col sm={8}>
                            <Card className="stats-card">
                                <Card.Title>Stats</Card.Title>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default Friends;
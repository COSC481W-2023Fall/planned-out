import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Home = () => {

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <Card className="tasks-card">
                            <Card.Title>Tasks</Card.Title>
                        </Card>
                    </Col>
                    <Col sm={8}>
                        <Card className="calendar-card">
                            <Card.Title>Calendar</Card.Title>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;

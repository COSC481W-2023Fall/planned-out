import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Settings = () => {
    return (
      <div className="App">
        <Container>
          <Row>
            {/* Settings List */}
            <Col>
              <ListGroup>
                <ListGroup.Item>Security</ListGroup.Item>
              </ListGroup>
            </Col>
            {/* Current Settings Page */}
            <Col sm={8}>
              <Card>
                <Card.Title>Account</Card.Title>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  
  export default Settings;
  
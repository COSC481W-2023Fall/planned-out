import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

function CheckBox({ taskname, id }) {
    return (
        <ListGroup.Item className="task">
            {<Form.Check type='checkbox' id={id} label={taskname} />}
        </ListGroup.Item>
    );
}

const tasksList = [
    'Take the dog for a walk',
    'Clean the kitchen',
    'Get groceries',
    'Make dinner',
    'Complete homework for class'
]

const Home = () => {

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <Card className="tasks-card">
                            <Card.Title>Tasks</Card.Title>
                            <ListGroup className="task-list">
                                {/* For loop for each task in the tasks list */}
                                {tasksList
                                    .map((task) => (
                                        <CheckBox className="task" id={"task" + tasksList.indexOf(task)} taskname={task}></CheckBox>
                                    ))}
                            </ListGroup>
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

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
                    {/* Tasks Card */}
                        <Card className="tasks-card">
                            <Card.Title>Today's Tasks</Card.Title>
                            {/* List of Tasks */}
                            <ListGroup className="task-list">
                                {/* For loop for each task in the tasks list */}
                                {tasksList
                                    .map((task) => (
                                        <CheckBox 
                                        className="task" 
                                        id={"task" + tasksList.indexOf(task)} 
                                        taskname={task}>
                                        </CheckBox>
                                    ))}
                            </ListGroup>
                            {/* Spacer */}
                            <div className="d-flex flex-column"></div>
                            {/* Add a task button */}
                            <Button id="add-task-button">Add a task +</Button>
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

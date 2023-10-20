import Container from "react-bootstrap/Container";
import { useEffect, useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
/*import './TaskCard.css';*/

const Home = () => {
    const [taskName, setNameInput] = useState(""); // New state for the name input
    const [taskDate, setDateInput] = useState(""); // New state for the name input
    const [taskDesc, setDescInput] = useState(""); // New state for the name input
    const inputBox = useRef(null);

    const handleSubmit = (e) => {
        // Send the name input to the server
        fetch("http://localhost:5050/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: taskName, date: taskDate, desc: taskDesc }),
        })
            .then((res) => {
                res.json();
                // Empty the name input value for re-use

            })
            .then((data) => {
            });
    };

    const handleNameInput = (e) => {
        setNameInput(e.target.value);
    };

    const handleDateInput = (e) => {
        setDateInput(e.target.value);
    };

    const handleDescInput = (e) => {
        setDescInput(e.target.value);
    };

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <Card className="tasks-card">
                            <Card.Title>New Task</Card.Title>
                            <Form.Control
                                ref={inputBox}
                                defaultValue={taskName}
                                placeholder="Enter task name"
                                onChange={(e) => handleNameInput(e)}
                            />
                            <Form.Control
                                ref={inputBox}
                                defaultValue={taskDate}
                                placeholder="Enter date for task"
                                onChange={(e) => handleDateInput(e)}
                            />

                            <Form.Control
                                ref={inputBox}
                                defaultValue={taskDate}
                                placeholder="Enter time for task"
                                onChange={(e) => handleDateInput(e)}
                            />

                            <Form.Control
                                ref={inputBox}
                                defaultValue={taskDesc}
                                placeholder="Enter task description"
                                onChange={(e) => handleDescInput(e)}
                                className="taskDescBox"
                            />
                            <Button onClick={(e) => handleSubmit(e)}>Submit!</Button>

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

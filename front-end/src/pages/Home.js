import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CalendarView from "../components/CalendarView.js"
import TaskAdd from "../components/TaskAdd.js"
import TaskList from "../components/TaskList.js"
import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React from "react";

const Home = () => {
    const userCookie = localStorage.getItem('user');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (userCookie == null) {
            navigate(`/login`);
        }
    })

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username') || userCookie;
    console.log("FROM HOME " + username);

    const [isTaskListShown, setIsTaskListShown] = useState(true);
    const [isTaskAddShown, setIsTaskAddShown] = useState(false);

    const taskAddRef = useRef();

    
    function showTaskAdd() {
        // Show the Task Add card
        setIsTaskAddShown(current => !current);
        // Hide the Task List card
        setIsTaskListShown(false);
    }

    function logUserOut() {
        localStorage.clear();
        navigate(`/login`);
    }

    function showTaskList() {
        if (!(taskAddRef.current.getTaskName() === "")) {
            // Show the Task List card
            setIsTaskListShown(current => !current);
            // Hide the Task Add card
            setIsTaskAddShown(false);
            taskAddRef.current.handleSubmit();
        }
        else {
            alert("ERROR");
        }
    }

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        {/* Task List Card */}
                        {isTaskListShown &&
                            <Card className="tasks-card">
                                <Card.Title>Today's Tasks</Card.Title>
                                {/* List of Tasks */}
                                <TaskList username={username} />
                                {/* Spacer */}
                                <div className="d-flex flex-column"></div>
                                {/* Add a task button */}
                                <Button onClick={showTaskAdd} id="add-task-button">Add a task +</Button>
                            </Card>
                        }
                        {/* Task Add Card */}
                        {isTaskAddShown &&
                            <Card className="tasks-add">
                                <Card.Title>New Task</Card.Title>
                                <TaskAdd ref={taskAddRef} />
                                <Button onClick={showTaskList}>Submit!</Button>
                            </Card>
                        }
                    </Col>
                    {/* Calendar Card */}
                    <Col sm={8}>
                        <Card className="react-calendar">
                            <Card.Title>Calendar</Card.Title>
                            <Button onClick={logUserOut}>Log out</Button>
                            <div className="calendar-container">
                                <CalendarView />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
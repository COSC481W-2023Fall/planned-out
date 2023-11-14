import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CalendarView from "../components/CalendarView.js"
import TaskAdd from "../components/TaskAdd.js"
import TaskList from "../components/TaskList.js"
import { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const userCookie = localStorage.getItem('user');
  const navigate = useNavigate();

  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    if (userCookie == null) {
      navigate(`/login`);
    }
    setSelectedTheme(theme);
  }, [navigate, userCookie, theme, themeLoaded]);

  const location = useLocation();
  // Using URLSearchParams function to verify user information
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

  function showTaskList() {
    if (!(taskAddRef.current.getTaskName() === "")) {
      // Submit to TaskAdd
      taskAddRef.current.handleSubmit();
      // Hide the Task Add card
      setIsTaskAddShown(false);
      // Show the Task List card
      setIsTaskListShown(current => !current);
    }
    else {
      alert("ERROR! You must enter a task name");
    }
  }

  return (

    themeLoaded && <ThemeProvider theme={selectedTheme}>
      <GlobalStyles />
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
                <div className="calendar-container">
                  <CalendarView username={username} />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>


  );
};

export default Home;
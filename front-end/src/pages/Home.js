import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CalendarView from "../components/CalendarView.js"
import TaskAdd from "../components/TaskAdd.js"
import TaskList from "../components/TaskList.js"
import { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../themes/GlobalStyles.js';
import { useTheme } from '../themes/useTheme';
import  ThemeSelector from '../themes/themeSelector.js';

const Home = () => {

  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);


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
                  <TaskList />
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
                  <CalendarView />
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

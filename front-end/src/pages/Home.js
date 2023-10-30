import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CalendarView from "../components/CalendarView.js"
import TaskAdd from "../components/TaskAdd.js"
import TaskList from "../components/TaskList.js"
import { useState } from "react";

const Home = () => {

  const [isTaskListShown, setIsTaskListShown] = useState(true);
  const [isTaskAddShown, setIsTaskAddShown] = useState(false);
  const [trigger, setTrigger] = useState(0);

  function toggleTaskAdd() {
    // Show the Task Add card
    setIsTaskAddShown(current => !current);
    // Hide the Task List card
    setIsTaskListShown(false);
  }

  function toggleTaskList() {
    TaskAdd.handleSubmit();
    // Trigger the handle submit for Task Add
    //setTrigger((trigger) => trigger + 1)
    // Show the Task List card
    setIsTaskListShown(current => !current);
    // Hide the Task Add card
    setIsTaskAddShown(false);
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
                <TaskList />
                {/* Spacer */}
                <div className="d-flex flex-column"></div>
                {/* Add a task button */}
                <Button onClick={toggleTaskAdd} id="add-task-button">Add a task +</Button>
              </Card>
            }
            {/* Task Add Card */}
            {isTaskAddShown &&
              <Card className="tasks-add">
                <Card.Title>New Task</Card.Title>
                <TaskAdd trigger={trigger}/>
                <Button onClick={toggleTaskList}>Submit!</Button>
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
  );
};

export default Home;

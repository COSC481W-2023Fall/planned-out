import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import TaskList from "../components/TaskList.js"
import CalendarView from "../components/CalendarView.js"
import TaskAdd from "../components/TaskAdd.js"
import { useState } from "react";

const Home = () => {

  const [isTaskListShown, setIsTaskListShown] = useState(true);
  const [isTaskAddShown, setIsTaskAddShown] = useState(false);

  function toggleTaskAdd() {
    setIsTaskAddShown(current => !current);
  }

  function toggleTaskList() {
    setIsTaskListShown(current => !current);
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
                <TaskAdd />
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

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const Home = () => {
  function CheckBox({ taskname, id, taskStatus }) {
    let labelID = id + 'label';
    let checkedID = id + 'checked';

    if (taskStatus.toLowerCase() === 'complete') {
      return (
        <InputGroup>
          <Form.Check checked='true' onChange={handleChecked(checkedID, labelID)} type='checkbox' id={checkedID} />
          <label className={'checked'} id={labelID} htmlFor={id}>{taskname}</label>
        </InputGroup>
      )
    }
    return (
      <InputGroup>
        <Form.Check onChange={handleChecked(id, labelID)} type='checkbox' id={id} />
        <label className={'unchecked'} id={labelID} htmlFor={id}>{taskname}</label>
      </InputGroup>
    );
  }

  const handleChecked = (checkID, labelID) => (event) => {
    let label = document.getElementById(labelID);

    if (checkID.includes('checked')) {
      return;
    }

    if (label.className === "checked") {
      // TODO: Mark the task as incomplete in the database
      label.className = "unchecked";
      //checkBox.checked = false;
    }
    else if (label.className === "unchecked") {
      // TODO: Mark the task as completed in the database
      label.className = "checked";
      //checkBox.checked = true;
    }
  }

  const [tasksList, setTaskList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/")
      .then((res) => res.json())
      .then((data) => setTaskList(data));
  }, []);

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
                <ListGroup.Item className="task">
                  <InputGroup>
                    <Form.Check onClick={handleChecked('testtask', 'testtasklabel')} type='checkbox' id='testtask' />
                    <label className={"unchecked"} id='testtasklabel' htmlFor='testtask'>This is a test task</label>
                  </InputGroup>
                </ListGroup.Item>
                {/* For loop for each task in the tasks list */}
                {tasksList
                  .map((task) => (
                    <ListGroup.Item className="task">
                      <CheckBox
                        className="task"
                        id={"task" + tasksList.indexOf(task)}
                        taskname={task.taskName}
                        taskStatus={task.taskStatus}>
                      </CheckBox>
                    </ListGroup.Item>
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

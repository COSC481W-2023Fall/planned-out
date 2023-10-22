import Container from "react-bootstrap/Container";
import { useEffect, useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";

const Home = () => {
  const [taskName, setNameInput] = useState(""); // New state for the name input
  const [taskDate, setDateInput] = useState("");
  const [taskDateOut, setDateOutput] = useState("");
  const [taskDesc, setDescInput] = useState(""); // New state for the name input
  const inputBox = useRef(null);

  const handleSubmit = (e) => {
    console.log("Test Task Add");
    if (taskName !== "" && taskDate !== "") {
      // Send the name input to the server
      fetch("https://planned-out-backend.onrender.com/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: taskName,
          date: taskDateOut,
          desc: taskDesc,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {});

      console.log("Successfully added task!");
    } else {
      alert("Task must be named and have a date.");
    }
    setNameInput("");
    setDateInput("");
    setDateOutput("");
    setDescInput("");
  };

  const handleNameInput = (e) => {
    setNameInput(e.target.value);
  };

  // Verifying date format is correct to push to database.
  const handleDateInput = (date, month, day, year) => {
    let formattedDate = month + "-" + day + "-" + year;
    console.log(formattedDate);
    setDateOutput(formattedDate);
    setDateInput(date);
  };

  const handleDescInput = (e) => {
    setDescInput(e.target.value);
  };
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]); // this is where we can store the tasks from the database

  useEffect(() => {
    fetch("https://planned-out-backend.onrender.com/")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  function CheckBox({ id, taskID, taskName, taskDate, taskDesc, taskStatus }) {
    let labelID = id + "label";
    let checkedID = id + "checked";

    if (taskStatus.toLowerCase() === "complete") {
      return (
        <InputGroup>
          <Form.Check
            checked="checked"
            onChange={handleChecked(
              id,
              labelID,
              taskID,
              taskName,
              taskDate,
              taskDesc,
              taskStatus
            )}
            type="checkbox"
            id={checkedID}
          />
          <label className={"checked"} id={labelID} htmlFor={id}>
            {taskName}
          </label>
        </InputGroup>
      );
    }
    return (
      <InputGroup>
        <Form.Check
          onChange={handleChecked(
            id,
            labelID,
            taskID,
            taskName,
            taskDate,
            taskDesc,
            taskStatus
          )}
          type="checkbox"
          id={id}
        />
        <label className={"unchecked"} id={labelID} htmlFor={id}>
          {taskName}
        </label>
      </InputGroup>
    );
  }

  const handleChecked =
    (checkID, labelID, taskID, taskName, taskDate, taskDesc, taskStatus) =>
    (event) => {
      let label = document.getElementById(labelID);

      if (checkID.includes("checked")) {
        return;
      }

      if (label.className === "checked") {
        taskStatus = "Incomplete";
        label.className = "unchecked";
      } else if (label.className === "unchecked") {
        taskStatus = "Complete";
        label.className = "checked";
      }
      let fetchRequest =
        "https://planned-out-backend.onrender.com/updatetask/:" + taskID;

      // TODO: Mark the task as incomplete in the database
      fetch(fetchRequest, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: taskID,
          name: taskName,
          date: taskDate,
          desc: taskDesc,
          status: taskStatus,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {});

      console.log("Successfully updated task!");
    };

  const [tasksList, setTaskList] = useState([]);

  useEffect(() => {
    fetch("https://planned-out-backend.onrender.com/")
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
                    <Form.Check
                      onClick={handleChecked("testtask", "testtasklabel")}
                      type="checkbox"
                      id="testtask"
                    />
                    <label
                      className={"unchecked"}
                      id="testtasklabel"
                      htmlFor="testtask"
                    >
                      This is a test task
                    </label>
                  </InputGroup>
                </ListGroup.Item>
                {/* For loop for each task in the tasks list */}
                {tasksList.map((task) => (
                  <ListGroup.Item className="task">
                    <CheckBox
                      className="task"
                      id={"task" + tasksList.indexOf(task)}
                      taskID={task._id}
                      taskName={task.taskName}
                      taskDate={task.taskDate}
                      taskDesc={task.taskDesc}
                      taskStatus={task.taskStatus}
                    ></CheckBox>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {/* Spacer */}
              <div className="d-flex flex-column"></div>
              {/* Add a task button */}
              <Button id="add-task-button">Add a task +</Button>
            </Card>
            <Card className="tasks-add">
              <Card.Title>New Task</Card.Title>

              <Form.Control
                ref={inputBox}
                className="taskNameBox"
                value={taskName}
                placeholder="Enter task name"
                onChange={(e) => handleNameInput(e)}
              />

              <DatePicker
                showIcon
                className="taskDateBox"
                selected={taskDate}
                onChange={(date) =>
                  handleDateInput(
                    date,
                    date.getMonth() + 1,
                    date.getDate(),
                    date.getFullYear()
                  )
                }
                placeholderText="Select a date"
                dateformat="mm-dd-yyyy"
              />

              <Form.Control
                as="textarea"
                ref={inputBox}
                value={taskDesc}
                placeholder="Enter task description"
                onChange={(e) => handleDescInput(e)}
                className="taskDescBox"
              />

              <Button onClick={(e) => handleSubmit(e)}>Submit!</Button>
            </Card>
          </Col>
          <Col sm={8}>
            <Card className="react-calendar">
              <Card.Title>Calendar</Card.Title>
              <div className="calendar-container">
                <Calendar
                  onChange={setDate}
                  value={date}
                  calendarType="gregory"
                  onClickDay={(value, event) => console.log(value)}
                  tileContent={({ date }) => {
                    if (tasks) {
                      // Convert the date to a string in "MM-DD-YYYY" format
                      const formattedDate = `${
                        date.getMonth() + 1
                      }-${date.getDate()}-${date.getFullYear()}`;

                      // Check if there is a task for the selected date
                      const hasTask = tasks.some(
                        (task) => task.taskDate === formattedDate
                      );

                      // Render a custom content if there is a task, otherwise return null
                      return hasTask ? " 📃" : null;
                    }
                    return null;
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

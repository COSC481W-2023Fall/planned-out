import Container from "react-bootstrap/Container";
import { useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskList from "../components/TaskList.js"
import CalendarView from "../components/CalendarView.js"

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
      fetch("https://planned-out-backend-jdx6.onrender.com/add", {
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
        .then((data) => { });

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

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            {/* Tasks Card */}
            <Card className="tasks-card">
              <Card.Title>Today's Tasks</Card.Title>
              {/* List of Tasks */}
              <TaskList />
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
                <CalendarView/>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

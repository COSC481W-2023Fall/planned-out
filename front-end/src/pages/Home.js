import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]); // this is where we can store the tasks from the database

  useEffect(() => {
    fetch("https://planned-out-backend.onrender.com/")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  console.log(tasks);
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Card className="tasks-card">
              <Card.Title>Tasks</Card.Title>
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

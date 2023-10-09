import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Calendar from "react-calendar";
import { useState } from "react";

const Home = () => {
  const [date, setDate] = useState(new Date());

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
                  tileContent={({ date, view }) => "\n{task}"} // this is where we can add tasks to the calendar maybe just an indicator dot, not sure
                />
                {/*there is an onClickDay handler we can use for task creation */}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "./registration.css";

const Registration = () => {
  return (
    <div className="App">
      <Container>
        <Form className="registration-form">
          <Form.Group className="form-group">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};
export default Registration;

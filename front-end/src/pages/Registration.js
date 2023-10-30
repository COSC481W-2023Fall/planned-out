import Container from "react-bootstrap/Container";
import RegistrationForm from "../components/RegistrationForm.js";
import "./registration.css";

const Registration = () => {
  return (
    <div className="App">
      <Container className="registration-container">
        <RegistrationForm />
      </Container>
    </div>
  );
};
export default Registration;

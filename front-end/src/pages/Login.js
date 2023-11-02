import Container from "react-bootstrap/Container";
import LoginForm from "../components/LoginForm.js";
//import "./login.css";

const Login = () => {
  return (
    <div className="App">
      <Container className="login-container">
        <LoginForm />
      </Container>
    </div>
  );
};
export default Login;

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

let link = "https://planned-out-backend-jdx6.onrender.com/";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);

  const validation = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Required`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    console.log("Attempting Login");
    if (
      username.errors === "" &&
      password.errors === "" &&
      username !== "" &&
      password !== ""
    ) {
      // Send the name input to the server
      fetch(link + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {});
      console.log("Successfully logged in!");
    } else {
      e.preventDefault();
      document.getElementById("badLogin").innerHTML =
        "Incorrect username or password";
      console.log("Login failed");
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="login-form">
          <Form.Label>Username </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validation(e);
            }}
            isInvalid={!!errors.username}
            onBlur={(e) => validation(e)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
          <br />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validation(e);
            }}
            isInvalid={!!errors.password}
            onBlur={(e) => validation(e)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
          <br />
          <Button
            className="login-button"
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>
          <br />
          <Form.Text id="badLogin"></Form.Text>
          <br />

          <Form.Text className="text-muted">
            Don't have an account? <a href="/registration">Register</a>
          </Form.Text>
        </Form.Group>
      </Form>
    </>
  );
}
export default LoginForm;

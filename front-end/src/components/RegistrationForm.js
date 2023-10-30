import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

let link = "https://planned-out-backend-jdx6.onrender.com/";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMsg] = useState("");
  //   const [passwordValidity, setPasswordValidity] = useState(false);

  const handleSubmit = (e) => {
    console.log("Registering User");
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      username !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      fetch(link + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          email: email,
          username: username,
          password: password,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {});
      console.log("Successfully registered user!");
    } else {
      alert("Please fill out all fields.");
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const fnameInput = (e) => {
    setFirstName(e.target.value);
  };
  const lnameInput = (e) => {
    setLastName(e.target.value);
  };
  const emailInput = (e) => {
    setEmail(e.target.value);
  };
  const usernameInput = (e) => {
    setUsername(e.target.value);
  };
  const passwordInput = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
  };
  const passwordMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setErrorMsg("");
      //   ValidityState(true);
    } else {
      setErrorMsg("Passwords do not match.");
      //   ValidityState(false);
    }
  };

  return (
    <>
      <Form className="registration-form">
        <Form.Group className="form-group">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => fnameInput(e)}
          />
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => lnameInput(e)}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => emailInput(e)}
          />
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => usernameInput(e)}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              passwordInput(e);
              passwordMatch(e.target.value, confirmPassword);
            }}
          />
          <Form.Text id="passwordHelpBlock">
            Your password must be 8-20 characters long and may not contain
            spaces
          </Form.Text>
          <br />
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              confirmPasswordInput(e);
              passwordMatch(password, e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <p className="errorMsg">{errorMessage}</p>
        <Button
          className="regButton"
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          Submit!
        </Button>
      </Form>
    </>
  );
}
export default RegistrationForm;

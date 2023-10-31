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
  const [errors, setErrors] = useState({ valid: "true" });

  const handleValidation = () => {
    const errors = {};
    if (!firstName) {
      errors.firstName = "First name is required";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!username) {
      errors.username = "Username is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm password";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (email.includes("@") === false || email.includes(".") === false) {
      errors.email = "Please enter a valid email address";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("Registering User");
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
      // alert("Please fill out all fields.");
    }
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
            isInvalid={!!errors.firstName}
            onBlur={(e) => {
              handleValidation(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
          <br />
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => lnameInput(e)}
            isInvalid={!!errors.lastName}
            onBlur={(e) => {
              handleValidation(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
          <br />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => emailInput(e)}
            isInvalid={!!errors.email}
            onBlur={(e) => {
              handleValidation(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
          <br />
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => usernameInput(e)}
            isInvalid={!!errors.username}
            onBlur={(e) => {
              handleValidation(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              passwordInput(e);
            }}
            isInvalid={!!errors.password}
            onBlur={(e) => {
              handleValidation(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
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
            }}
            isInvalid={!!errors.confirmPassword}
            onBlur={(e) => {
              handleValidation(e);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
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

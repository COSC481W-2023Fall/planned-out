import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

let link = "http://localhost:5050/"
// let link = "https://planned-out-backend-jdx6.onrender.com/";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validation = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Required`,
      }));
    } else if (name === "password" && (value.length < 8 || value.length > 20)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
    } else if (name === "password" && value.includes(" ")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password may not contain spaces",
      }));
    } else if (
      name === "password" &&
      value.length <= 20 &&
      value.length >= 8 &&
      !value.includes(" ")
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    } else if (
      (name === "confimPassword" && value === password) ||
      (name === "password" && value === confirmPassword)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
        confirmPassword: "",
      }));
    } else if (
      (name === "confirmPassword" && value !== password) ||
      (name === "password" && value !== confirmPassword)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else if (
      (name === "email" && !value.includes("@")) ||
      (name === "email" && !value.includes("."))
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
    const isAllValid =
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      username.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.email &&
      !errors.username &&
      !errors.password &&
      !errors.confirmPassword;

    setIsFormValid(isAllValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.firstName &&
      !errors.lastName &&
      !errors.email &&
      !errors.username &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      console.log(errors.firstName);
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
      alert("Please fill out all fields correctly");
      console.log("Error registering user");
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
          <Form.Label className="registration-label">First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => {
              fnameInput(e);
              validation(e);
            }}
            isInvalid={!!errors.firstName}
            onBlur={(e) => {
              validation(e);
            }}
            name="firstName"
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
          <br />
          <Form.Label className="registration-label">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => {
              lnameInput(e);
              validation(e);
            }}
            isInvalid={!!errors.lastName}
            onBlur={(e) => {
              validation(e);
            }}
            name="lastName"
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="registration-label">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              emailInput(e);
              validation(e);
            }}
            isInvalid={!!errors.email}
            onBlur={(e) => {
              validation(e);
            }}
            name="email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
          <br />
          <Form.Label className="registration-label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              usernameInput(e);
              validation(e);
            }}
            isInvalid={!!errors.username}
            onBlur={(e) => {
              validation(e);
            }}
            name="username"
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="registration-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              passwordInput(e);
              validation(e);
            }}
            isInvalid={!!errors.password}
            onBlur={(e) => {
              validation(e);
            }}
            name="password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
          <br />
          <Form.Label className="registration-label">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              confirmPasswordInput(e);
              validation(e);
            }}
            isInvalid={!!errors.confirmPassword}
            onBlur={(e) => {
              validation(e);
            }}
            name="confirmPassword"
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className="regButton"
          type="button"
          onClick={(e) => {
            handleSubmit(e);
          }}
          disabled={!isFormValid}
        >
          Submit!
        </Button>
      </Form>
    </>
  );
}
export default RegistrationForm;

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

let link = localStorage.getItem("backendURL");


function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

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
      (name === "confirmPassword" && value === password) ||
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
  };
  useEffect(() => {
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
  }, [firstName, lastName, email, username, password, confirmPassword, errors]);

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
          if (res.status !== 200) {
            alert("Username already exists. Please try again.");
          } else {
            navigate(`/login`);
          }
        })
        .then((data) => {});
    } else {
      alert("Please fill out all fields correctly");
      console.log("Error registering user");
    }
  };

  return (
    <>
      <Form className="registration-form">
        <Form.Group className="form-group">
          <Form.Label className="registration-label" htmlFor="firstName">
            First Name
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validation(e);
            }}
            isInvalid={!!errors.firstName}
            onBlur={(e) => {
              validation(e);
            }}
            name="firstName"
            id="firstName"
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
          <br />
          <Form.Label className="registration-label" htmlFor="lastName">
            Last Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              validation(e);
            }}
            isInvalid={!!errors.lastName}
            onBlur={(e) => {
              validation(e);
            }}
            name="lastName"
            id="lastName"
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="registration-label" htmlFor="email">
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validation(e);
            }}
            isInvalid={!!errors.email}
            onBlur={(e) => {
              validation(e);
            }}
            name="email"
            id="email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
          <br />
          <Form.Label className="registration-label" htmlFor="username">
            Username
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validation(e);
            }}
            isInvalid={!!errors.username}
            onBlur={(e) => {
              validation(e);
            }}
            name="username"
            id="username"
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="registration-label" htmlFor="password">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validation(e);
            }}
            isInvalid={!!errors.password}
            onBlur={(e) => {
              validation(e);
            }}
            name="password"
            id="password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
          <br />
          <Form.Label className="registration-label" htmlFor="confirmPassword">
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validation(e);
            }}
            isInvalid={!!errors.confirmPassword}
            onBlur={(e) => {
              validation(e);
            }}
            name="confirmPassword"
            id="confirmPassword"
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

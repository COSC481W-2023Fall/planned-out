import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

let link = localStorage.getItem("backendURL");

const SettingsCard = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
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

    if (newPassword1 !== newPassword2) {
      e.preventDefault();
      document.getElementById("badLogin").innerHTML = "PASSWORDS DO NOT MATCH";
    } else {
      document.getElementById("badLogin").innerHTML = "";
    }
  };

  const handleSubmit = (e) => {
    console.log("Attempting Login");
    console.log(username);
    console.log(password);

    console.log(!errors.username);
    console.log(!errors.password);
    console.log(username !== "");
    console.log(password !== "");
    console.log(newPassword1 === newPassword2);
    // console.log(errors);
    if (
      !errors.username &&
      !errors.password &&
      username !== "" &&
      password !== "" &&
      newPassword1 === newPassword2
    ) {
      console.log(newPassword1);
      //next 2 lines need to be changed to direct to user home
      e.preventDefault(); //comment out when backend is ready
      // window.location.href = "./login"; //comment out when backend is ready

      // Send the name input to the server
      fetch(link + "update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          newPassword: newPassword1,
        }),
      })
        .then((res) => {
          console.log("hello");
          if (res.status === 200) {
            console.log("Successfully updated password!");
          } else {
            alert("PASSWORD ERROR: Current password is incorrect ");
          }
        })
        .catch((error) => {
          console.error("Error occurred during fetch:", error);
          // Handle the error, show an error message, or retry the request
        });
    } else {
      e.preventDefault();
      document.getElementById("badLogin").innerHTML =
        "Incorrect username or password";
      console.log("Login failed");
    }
  };
  return (
    <>
      <Card className="settings-card">
        <Card.Title>Security</Card.Title>
        <Card.Subtitle>Change Password</Card.Subtitle>
        <Card.Body>
          <Form style={{ textAlign: "left" }}>
            <Form.Group controlId="SecUserName" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  validation(e);
                }}
                isInvalid={!!errors.username}
                onBlur={(e) => validation(e)}
              />
            </Form.Group>

            <Form.Group controlId="SecPassOld" className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your current password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validation(e);
                }}
                isInvalid={!!errors.password}
                onBlur={(e) => validation(e)}
              />
            </Form.Group>

            <Form.Group controlId="SecPassNew1" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a new password"
                onChange={(e) => {
                  setNewPassword1(e.target.value);
                  validation(e);
                }}
                isInvalid={!!errors.password}
                onBlur={(e) => validation(e)}
              />
            </Form.Group>

            <Form.Group controlId="SecPassNew2" className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat new password"
                onChange={(e) => {
                  setNewPassword2(e.target.value);
                  validation(e);
                }}
                isInvalid={!!errors.password}
                onBlur={(e) => validation(e)}
              />
            </Form.Group>
            <Form.Text id="badLogin"></Form.Text>

            <Button
              className="login-button"
              variant="primary"
              onClick={handleSubmit}
              //   type="submit"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default SettingsCard;

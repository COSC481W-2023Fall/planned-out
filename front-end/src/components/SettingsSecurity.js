import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
// let link = "https://planned-out-backend-jdx6.onrender.com/";
let link = "http://localhost:5050/";

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

        if(newPassword1 !== newPassword2){
            e.preventDefault();
            document.getElementById("badLogin").innerHTML =
                "PASSWORDS DO NOT MATCH";
        }
    };

    const handleSubmit = (e) => {
        console.log("Attempting Login");
        console.log(username);
        console.log(password);
        // console.log(errors);
        if (
            !errors.username &&
            !errors.password &&
            username !== "" &&
            password !== "" &&
            newPassword1 === newPassword2
        ) {
            //next 2 lines need to be changed to direct to user home
            // e.preventDefault(); //comment out when backend is ready
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
                    newPassword: newPassword,
                }),
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log("Successfully updated password!");
                    }else{
                        alert("PASSWORD ERROR: Current password is incorrect ");
                    }
                })
                .then((data) => { });
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

                    <Form>
                        <Form.Group controlId="SecUserName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="something@example.com" onChange={(e) => {
                                setUsername(e.target.value);
                                validation(e);
                            }}
                                isInvalid={!!errors.username} onBlur={(e) => validation(e)} />
                        </Form.Group>

                        <Form.Group controlId="SecPassOld">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your current password" onChange={(e) => {
                                setPassword(e.target.value);
                                validation(e);
                            }}
                                isInvalid={!!errors.password} onBlur={(e) => validation(e)} />
                        </Form.Group>

                        <Form.Group controlId="SecPassNew1">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter a new password" onChange={(e) => {
                                setNewPassword1(e.target.value);
                                validation(e);
                            }}
                                isInvalid={!!errors.password} onBlur={(e) => validation(e)} />
                        </Form.Group>

                        <Form.Group controlId="SecPassNew2">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" placeholder="Repeat new password" onChange={(e) => {
                                setNewPassword2(e.target.value);
                                validation(e);
                            }}
                                isInvalid={!!errors.password} onBlur={(e) => validation(e)} />
                        </Form.Group>
                        <br />
                    <Form.Text id="badLogin"></Form.Text>
                    <br />
                        <Button className="login-button" variant="primary" onClick={handleSubmit} type="submit" >
                            Submit
                        </Button>


                    </Form>
                </Card.Body>
            </Card>
        </>
    )

}

export default SettingsCard;
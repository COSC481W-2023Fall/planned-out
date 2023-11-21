import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";

let link = localStorage.getItem("backendURL");

const SettingsCard = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [errors, setErrors] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const validation = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: `Required`,
            }));
        } else if (name === "newPassword1" && (value.length < 8 || value.length > 20)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                newPassword1: "Password must be at least 8 characters long",
            }));
        } else if ((name === "newPassword1" && value.includes(" ")) || (name === "newPassword2" && value.includes(" "))) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                newPassword1: "Password may not contain spaces",
            }));
        } else if (
            name === "newPassword1" &&
            value.length <= 20 &&
            value.length >= 8 &&
            !value.includes(" ") &&
            !value.includes("")
        ) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                newPassword1: "",
            }));
        } else if (
            (name === "newPassword2" && value === newPassword1) ||
            (name === "newPassword1" && value === newPassword2)
        ) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                newPassword1: "",
                newPassword2: "",
            }));
            document.getElementById("badLogin").innerHTML =
                "";;
        } else if (
            (name === "newPassword2" && value !== newPassword1) ||
            (name === "newPassword1" && value !== newPassword2)
        ) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                newPassword2: "Passwords do not match",
            }));
            document.getElementById("badLogin").innerHTML =
                "Passwords do not match!";
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }))
            document.getElementById("badLogin").innerHTML =
                "";;
        }
    };

    useEffect(() => {
        const isAllValid =
            username.trim() !== "" &&
            password.trim() !== "" &&
            newPassword1.trim() !== "" &&
            newPassword2.trim() !== "" &&
            newPassword1.value === newPassword2.value &&
            !errors.username &&
            !errors.password &&
            !errors.newPassword1 &&
            !errors.newPassword2;

        setIsFormValid(isAllValid);
    }, [username, password, newPassword1, newPassword2, errors]);

    const handleSubmit = (e) => {
        console.log("Attempting Login");
        console.log(username);
        console.log(password);
        // console.log(errors);
        if (
            !errors.username &&
            !errors.password &&
            !errors.newPassword1 &&
            !errors.newPassword2 &&
            username !== "" &&
            password !== "" &&
            newPassword1 !== "" &&
            newPassword2 !== "" &&
            newPassword1.value === newPassword2.value
        ) {
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
                    if (res.status === 200) {
                        alert("Password updated successfully!")
                        console.log("Successfully updated password!");
                    } else {
                        alert("PASSWORD ERROR: Current password is incorrect ");
                    }
                })
                .then((data) => { });
        } else {
            e.preventDefault();
            document.getElementById("badLogin").innerHTML =
                "Username required!";
            console.log("Login failed");
        }
    };
    return (
        <>
            <Card className="settings-card">
                <Card.Title>Security</Card.Title>
                <Card.Subtitle>Change Password</Card.Subtitle>
                <Card.Body>

                    <Form style={{ textAlign: 'left' }}>
                        <Form.Group controlId="SecUserName" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter your Username" onChange={(e) => {
                                setUsername(e.target.value);
                                validation(e);
                            }}
                                isInvalid={!!errors.username} onBlur={(e) => validation(e)} />
                        </Form.Group>

                        <Form.Group controlId="SecPassOld" className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your current password" onChange={(e) => {
                                setPassword(e.target.value);
                                validation(e);
                            }}
                                isInvalid={!!errors.password} onBlur={(e) => validation(e)} />
                        </Form.Group>

                        <Form.Group controlId="SecPassNew1" className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control name="newPassword1" type="password" placeholder="Enter a new password" onChange={(e) => {
                                setNewPassword1(e.target.value);
                                validation(e)
                            }}
                                isInvalid={!!errors.newPassword1} onBlur={(e) => validation(e)} />
                            <Form.Control.Feedback type="invalid">
                                {errors.newPassword1}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId="SecPassNew2" className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control name="newPassword2" type="password" placeholder="Repeat new password" onChange={(e) => {
                                setNewPassword2(e.target.value);
                                validation(e);
                            }}
                                isInvalid={!!errors.newPassword2} onBlur={(e) => validation(e)} />
                            <Form.Control.Feedback type="invalid">
                                {errors.newPassword2}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Text id="badLogin"></Form.Text>
                        <br />
                        {/* This is a temporary fix to center the button because Kyle doesn't know what he's doing. - See Settings.css for styling */}
                        <div class="button-div">
                            <Button className="settings-change-button" variant="primary" onClick={handleSubmit} disabled={!isFormValid} type="submit" >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )

}

export default SettingsCard;
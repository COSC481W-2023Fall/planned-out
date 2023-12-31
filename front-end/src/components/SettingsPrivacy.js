import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let link = localStorage.getItem("backendURL");

const SettingsCard = (props) => {

    const navigate = useNavigate();

    const [showTaskDelete, setTaskDeleteShow] = useState(false);
    const [showAccountDelete, setAccountDeleteShow] = useState(false);

    const handleTaskDeleteClose = () => setTaskDeleteShow(false);
    const handleTaskDeleteShow = () => setTaskDeleteShow(true);
    const handleAccountDeleteClose = () => setAccountDeleteShow(false);
    const handleAccountDeleteShow = () => setAccountDeleteShow(true);

    function deleteTasks() {
        // Send the delete request to the server
        fetch(link + "delete-all-tasks", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: localStorage.getItem("user")
            }),
        })
            .then((res) => {
                res.json();
            })
        // Hide the modal
        setTaskDeleteShow(false);
    }

    function deleteAccount() {
        // First, delete all of the tasks
        deleteTasks();
        // Then, send a delete account request to the server
        fetch(link + "delete-account", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: localStorage.getItem("user")
            }),
        })
            .then((res) => {
                res.json();
            })

        // Hide the modal
        setAccountDeleteShow(false);

        // Delete the user from local storage
        localStorage.removeItem("user");

        // Navigate to login page
        navigate(`/login`);
    }


    return (
        <>
            <Card className="settings-card">
                <Card.Title>Privacy</Card.Title>
                <Card.Text className="settings-section">Delete all tasks</Card.Text>
                <Button data-testid="DeleteTasksButton" className="delete-button" onClick={handleTaskDeleteShow}>Delete all tasks</Button>
                <Card.Text className="settings-section">Delete Account</Card.Text>
                <Button data-testid="DeleteAccountButton" className="delete-button" onClick={handleAccountDeleteShow}>Delete account</Button>
            </Card>

            <Modal show={showTaskDelete} onHide={handleTaskDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete All Tasks</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete all of your tasks? This action cannot be reversed.</Modal.Body>
                <Modal.Footer>
                    <Button className="danger" onClick={deleteTasks}>
                        Delete all tasks
                    </Button>
                    <Button onClick={handleTaskDeleteClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAccountDelete} onHide={handleAccountDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your account? This action cannot be reversed.</Modal.Body>
                <Modal.Footer>
                    <Button className="danger" onClick={deleteAccount}>
                        Delete account
                    </Button>
                    <Button classNAme onClick={handleAccountDeleteClose}>
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )

}

export default SettingsCard;
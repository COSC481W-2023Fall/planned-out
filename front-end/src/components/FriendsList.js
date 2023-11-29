import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';

let link = localStorage.getItem("backendURL");

const FriendsList = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [username, setUsername] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [dateRange, setDateRange] = useState(['daily']);

        // Listen for date_range in localStorage
        window.addEventListener('date_range', () => {
            setDateRange(localStorage.getItem("date_range"));
        })

    useEffect(() => {
        setFriendsList([]);
        fetch(link + "get-friends", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: localStorage.getItem("user"),
                dateRange: dateRange
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                getUser(data['friends'], dateRange)
            })
    }, [dateRange]);

    function getUser(friends, daterange) {
        for (let i = 0; i < friends.length; i++) {
            fetch(link + "get-friend-info", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: friends[i],
                    dateRange: daterange
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    let profilePic = data['profilePic'];
                    if (profilePic === undefined) {
                        profilePic = "default";
                    }
                    setFriendsList(friendsList => {
                        return [
                            ...friendsList,
                            {
                                name: (data['firstName'] + " " + data['lastName']),
                                username: friends[i],
                                profilePic: profilePic,
                                numOfTasksCompleted: data['numOfTasksCompleted'],
                                numOfTasks: data['numOfTasks'],
                                percentOfTasks: data['percentOfTasks']
                            }
                        ]
                    })
                });
        }
    }

    const addFriend = (friendUsername) => {
        fetch(link + "add-friend", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: localStorage.getItem("user"),
                friendUsername: friendUsername
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    alert(res.statusText);
                    throw new Error(res.statusText);
                }
                else {
                    res.json();
                }
            })
            .catch(error => console.error(error))
        handleClose()
    }

    return (
        <>
        <p>Date range: {dateRange}</p>
            {friendsList
                .sort((a, b) => b.percentOfTasks - a.percentOfTasks)
                .map((friend, index) => (
                    <Card className="friend-info" key={"frienddiv" + index}>
                        <img className="friends-list-profile-pic" alt={friend.profilePic} key={"profilePic" + index} src={"/avatars/" + friend.profilePic + ".png"}></img>
                        <div className="friends-name-user-container">
                            <p className="friend-name" key={"friend" + index}>{friend.name}</p>
                            <p className="friend-username" key={"friendusername" + index}>({friend.username})</p>
                        </div>
                        <p key={"count" + index}>Tasks completed: {friend.numOfTasksCompleted}/{friend.numOfTasks}</p>
                    </Card>
                ))}
            <Button onClick={handleShow}>Add friend</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Friend's username"></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => addFriend(username)}>
                        Add friend
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FriendsList;
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
    const [profilePictureList, setProfilePictureList] = useState([]);

    useEffect(() => {
        fetch(link + "get-friends", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: localStorage.getItem("user")
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                getUser(data['friends'])
            })
    }, []);

    function getUser(friends) {
        for (let i = 0; i < friends.length; i++) {
            fetch(link + "get-profile-picture", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: friends[i]
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    let profilePic = data['profile_picture'];
                    if (profilePic === undefined) {
                        profilePic = "default";
                    }
                    setFriendsList(friendsList => {
                        return [
                            ...friendsList,
                            { name: (data['userFirst'] + " " + data['userLast']), username: friends[i], profilePic: profilePic }
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
                    alert("Error! The friend's username was not found in the database.");
                }
                else {
                    res.json();
                }
            })
        handleClose()
    }

    if (profilePictureList.length <= 0) {
        console.log("The list is empty!");
    }

    return (
        <>
            {friendsList
                .map((friend, index) => (
                    <Card className="friend-info" key={"frienddiv" + index}>
                        <img className="friends-list-profile-pic" alt={friend.profilePic} key={"profilePic" + index} src={"/avatars/" + friend.profilePic + ".png"}></img>
                        <p key={"friend" + index}>{friend.name}</p>
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
                            <Form.Control type="text" onChange={(e) => setUsername(e.target.value)}placeholder="Friend's username"></Form.Control>
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
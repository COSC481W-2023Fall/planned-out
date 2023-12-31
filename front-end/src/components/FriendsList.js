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
    const [leaderboardList, setLeaderboardList] = useState([]);
    const [dateRange, setDateRange] = useState(['total']);
    const [friendAdd, setFriendAdd] = useState([]);
    const [hasTriggered, setHasTriggered] = useState(false);

    // Listen for date_range in localStorage
    window.addEventListener('date_range', () => {
        if (hasTriggered) {
            console.log('Date range event already triggered');
        }
        else {
            setHasTriggered(true);
            setDateRange(localStorage.getItem("date_range"));
        }
    })

    const setUserToCompare = (userToCompare) => {
        window.localStorage.setItem("user_to_compare", userToCompare);
        window.dispatchEvent(new Event("user_to_compare"));
    }

    useEffect(() => {
        setLeaderboardList([]);
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
                addCurrentUser();
            })
    }, [friendAdd, dateRange]);

    function getUser(friends, daterange) {
        if (friends !== undefined) {
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
                        setLeaderboardList(leaderboardList => {
                            return [
                                ...leaderboardList,
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
                setFriendAdd(friendAdd => {
                    return [
                        ...friendAdd,
                        {
                            name: 'newfriend',
                        }
                    ]
                })
                handleClose();
            })
            .catch(error => console.error(error))
    }

    function addCurrentUser() {
        fetch(link + "get-friend-info", {
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
                let profilePic = data['profilePic'];
                if (profilePic === undefined) {
                    profilePic = "default";
                }
                setLeaderboardList(leaderboardList => {
                    return [
                        ...leaderboardList,
                        {
                            name: (data['firstName'] + " " + data['lastName']),
                            username: data['username'],
                            profilePic: profilePic,
                            numOfTasksCompleted: data['numOfTasksCompleted'],
                            numOfTasks: data['numOfTasks'],
                            percentOfTasks: data['percentOfTasks']
                        }
                    ]
                })
            });
    }

    function getDateRange() {
        return dateRange.toString().charAt(0).toUpperCase() + dateRange.toString().slice(1);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addFriend(username);
        }
    }

    return (
        <>
            <div className="friends-list-header">
                <div>
                    <Card.Title>Leaderboard</Card.Title>
                    <p>Range: {getDateRange()}</p>
                </div>
                <Button onClick={handleShow}>Add friend</Button>
            </div>
            <div className="friends-div no-scroll">
                {leaderboardList
                    .sort((a, b) => b.percentOfTasks - a.percentOfTasks)
                    .map((friend, index) => (
                        <Card onClick={() => setUserToCompare(friend.username)} className="friend-info-card" key={"frienddiv" + index}>
                            <div className="friend-info" key={"friend-info-div" + index}>
                                <img className="friends-list-profile-pic" alt={friend.profilePic} key={"profilePic" + index} src={"/avatars/" + friend.profilePic + ".png"}></img>
                                <div className="friends-name-user-container" key={"friends-name-user-container" + index}>
                                    <div className="name-username" key={"name-username" + index}>
                                        <p className="friend-name" key={"friend" + index}>{friend.name}</p>
                                        <p className="friend-username" key={"friendusername" + index}>({friend.username})</p>
                                    </div>
                                    <p className="tasks-completed" key={"count" + index}>{getDateRange()} tasks: {friend.numOfTasksCompleted}/{friend.numOfTasks}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control onKeyDown={handleKeyDown} type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Friend's username"></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
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
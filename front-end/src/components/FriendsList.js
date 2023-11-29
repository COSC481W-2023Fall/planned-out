import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

let link = localStorage.getItem("backendURL");

const FriendsList = () => {
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
                            {name: (data['userFirst'] + " "+ data['userLast']), username: friends[i], profilePic: profilePic}
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

            <Button onClick={() => addFriend('ted')}>Add friend</Button>
        </>
    );
};

export default FriendsList;
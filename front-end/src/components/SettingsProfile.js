import Card from "react-bootstrap/Card";
import { useState, useEffect  } from "react";


let link = localStorage.getItem("backendURL");


const SettingsCard = (props) => {

    const avatars = ['panda', 'bear', 'frog', 'penguin', 'raccoon', 'tiger'];
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        getUser();
      }, []);

    const setProfilePic = (option) => {
        // Send the delete request to the server
        fetch(link + "update-profile-picture", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: localStorage.getItem("user"),
                profilePic: option
            }),
        })
            .then((res) => {
                res.json();
            })
        window.localStorage.setItem("profile_picture", option);
        window.dispatchEvent(new Event("profile_picture"));
    }

    function getUser(){
        fetch(link + "get-friend-info", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: localStorage.getItem("user") // Gets info on user
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setName((data['firstName'] + " " + data['lastName']))
                setUsername(data.username);
            });
    }

    const ProfileButton = props => {
        return (
            <>
                <img src={props.src} key={props.avatarkey} alt={props.alt} onClick={(option) => setProfilePic(props.option)}></img>
            </>
        )
    }

    return (
        <>
            <Card className="settings-card">
                <Card.Title>Profile</Card.Title>
                <Card.Subtitle className="user-profile">Name: {name}</Card.Subtitle>
                <Card.Subtitle className="user-profile">Username: {username}</Card.Subtitle>
                <Card.Subtitle>Profile picture</Card.Subtitle>
                <div className="select-profile-container">
                    {
                        avatars.map(avatar => (
                            <ProfileButton avatarkey={avatar} alt={avatar} option={avatar} src={"/avatars/" + avatar + ".png"} />
                        ))
                    }
                </div>
            </Card>
        </>
    )

}

export default SettingsCard;
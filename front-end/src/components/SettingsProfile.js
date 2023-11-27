import Card from "react-bootstrap/Card";

let link = localStorage.getItem("backendURL");


const SettingsCard = (props) => {

    const avatars = ['panda', 'bear', 'frog', 'penguin', 'raccoon', 'tiger'];

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
    }

    const ProfileButton = props => {
        return (
            <>
                <img src={props.src} key={props.key} alt={props.alt} onClick={(option) => setProfilePic(props.option)}></img>
            </>
        )
    }

    return (
        <>
            <Card className="settings-card">
                <Card.Title>Profile</Card.Title>
                <Card.Subtitle>Profile picture</Card.Subtitle>
                <div className="select-profile-container">
                    {
                        avatars.map(avatar => (
                            <ProfileButton key={avatar} alt={avatar} option={avatar} src={"/avatars/" + avatar + ".png"} />
                        ))
                    }
                </div>
            </Card>
        </>
    )

}

export default SettingsCard;
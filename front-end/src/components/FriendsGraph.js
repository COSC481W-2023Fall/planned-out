import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";

let link = localStorage.getItem("backendURL");

const FriendsGraph = () => {

    const [friendsList, setFriendsList] = useState([]);
    const [dateRange, setDateRange] = useState(['daily']);
    const [graphData, setGraphData] = useState([]);

    // Listen for date_range in localStorage
    window.addEventListener('date_range', () => {
        setDateRange(localStorage.getItem("date_range"));
    })

    useEffect(() => {
        setFriendsList([]);
        setGraphData([]);
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
                    setGraphData(graphData => {
                        return [
                            ...graphData,
                            {
                                name: (data['firstName'] + " " + data['lastName']),
                                percentage: data['percentOfTasks']
                            }
                        ]
                    })
                });
        }
    }

    const data2 = [
        {
            name: 'Ted',
            Percentage: 80,
        },
        {
            name: 'Moorhead',
            Percentage: 20,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default FriendsGraph;
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";

let link = localStorage.getItem("backendURL");

const FriendsGraph = () => {

    const [dateRange, setDateRange] = useState(['daily']);
    const [graphData, setGraphData] = useState([]);
    const [userToCompare, setUserToCompare] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    // Listen for date_range in localStorage
    window.addEventListener('date_range', () => {
        setDateRange(localStorage.getItem("date_range"));
    })

    // Listen for user_compare in localStorage
    window.addEventListener('user_to_compare', () => {
        setUserToCompare(localStorage.getItem("user_to_compare"));
        handleCompare(localStorage.getItem("user_to_compare"));
        console.log("COMPARE", localStorage.getItem("user_to_compare"));
    })

    useEffect(() => {
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
                    setGraphData(graphData => {
                        return [
                            ...graphData,
                            {
                                name: (data['firstName'] + " " + data['lastName']),
                                username: data['username'],
                                percentage: data['percentOfTasks']
                            }
                        ]
                    })
                });
            fetch(link + "get-friend-info", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: localStorage.getItem("user"),
                    dateRange: daterange
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("DATAAAA", data);
                    setCurrentUser(currentUser => {
                        return [
                            {
                                name: (data['firstName'] + " " + data['lastName']),
                                username: data['username'],
                                percentage: data['percentOfTasks']
                            }
                        ]
                    })
                });
        }
    }

    const handleCompare = (username) => {
        let currentUserInfo = "";
        let comparedUser = "";

        //getCurrentUser();
        console.log("CURRENT USER THAT WAS PASSED IS", currentUser);

        if (currentUser.length === 1) {
            currentUserInfo = currentUser[0];
        }

        // Get friend to compare
        for (let i = 0; i < graphData.length; i++) {
            //console.log("Graph item", i, graphData[i]);
            console.log("username", graphData[i]['username']);
            if (graphData[i]['username'] === username) {
                comparedUser = graphData[i];
            }
        }

        //Clear graphData
        setGraphData([])

        // Add data to compare
        setGraphData((graphData) => {
            return [
                ...graphData,
                {
                    name: currentUserInfo['name'],
                    username: currentUserInfo['username'],
                    percentage: currentUserInfo['percentage']
                }
                ,
                {
                    name: comparedUser['name'],
                    username: comparedUser['username'],
                    percentage: comparedUser['percentage']
                }
            ]
        })
    }


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
import Calendar from "react-calendar";
import { useState, useEffect } from "react";

//let link = "http://localhost:5050/"
let link = "https://planned-out-backend-jdx6.onrender.com/"

function CalendarView({ username }) {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([]); // this is where we can store the tasks from the database

    useEffect(() => {
        fetch(link + `username=?${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
            }),
        })
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, [username]);

    return (
        <Calendar
            onChange={setDate}
            value={date}
            calendarType="gregory"
            onClickDay={(value, event) => console.log(value)}
            tileContent={({ date }) => {
                if (tasks) {
                    // Convert the date to a string in "MM-DD-YYYY" format
                    const formattedDate = `${date.getMonth() + 1
                        }-${date.getDate()}-${date.getFullYear()}`;

                    // Check if there is a task for the selected date
                    const hasTask = tasks.some(
                        (task) => task.taskDate === formattedDate
                    );

                    // Render a custom content if there is a task, otherwise return null
                    return hasTask ? " 📃" : null;
                }
                return null;
            }}
        />
    )
}

export default CalendarView;

import Calendar from "react-calendar";
import { useState, useEffect } from "react";

let link = localStorage.getItem("backendURL");

function CalendarView({ username }) {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([]); // this is where we can store the tasks from the database

    useEffect(() => {
        // Fetch our user's name from the URL
        fetch(link + `username=?${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
            }),
        }) // display specific user's tasks
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, [username]);

    const switchTasksDay = (value, event) => {
        let month = value.getMonth() + 1;
        let date = value.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        let year = value.getFullYear();

        let dateToSend = month + "-" + date + "-" + year;

        window.localStorage.setItem("current_tasks_day", dateToSend);
        window.dispatchEvent(new Event("current_tasks_day"));
    }

    return (
        <Calendar
            maxDetail={"month"}
            minDetail={"month"}
            onChange={setDate}
            value={date}
            calendarType="gregory"
            onClickDay={(value, event) => switchTasksDay(value)}
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

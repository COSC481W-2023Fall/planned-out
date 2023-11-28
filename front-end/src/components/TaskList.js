import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useState, useLayoutEffect } from "react";
import Card from "react-bootstrap/Card";

let link = localStorage.getItem("backendURL");

function TaskList({ username }) {

    const [tasksList, setTaskList] = useState([]);
    const [tasksDate, setTasksDate] = useState([]);

    // Listen for current_tasks_day in localStorage
    window.addEventListener('current_tasks_day', () => {
        setTasksDate(localStorage.getItem("current_tasks_day"));
        console.log(localStorage.getItem("current_tasks_day"));
    });

    function getToday() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let year = date.getFullYear();

        return (month + "-" + day + "-" + year);
    }

    useLayoutEffect(() => {
        if (tasksDate.length <= 0) {
            setTasksDate(getToday());
        }
        // verify user info from URL to display task list
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
            .then((data) => setTaskList(data));
    }, [tasksDate, username]);

    function CheckBox({ id, taskID, taskName, taskDate, taskDesc, taskStatus }) {
        let labelID = id + "label";
        let checkedID = id + "checked";

        if (taskStatus.toLowerCase() === "complete") {
            return (
                <InputGroup>
                    <Form.Check
                        checked="checked"
                        onChange={handleChecked(
                            id,
                            labelID,
                            taskID,
                            taskName,
                            taskDate,
                            taskDesc,
                            taskStatus
                        )}
                        type="checkbox"
                        id={checkedID}
                    />
                    <label className={"checked"} id={labelID} htmlFor={id}>
                        {taskName}
                    </label>
                </InputGroup>
            );
        }
        return (
            <InputGroup>
                <Form.Check onChange={handleChecked(
                    id,
                    labelID,
                    taskID,
                    taskName,
                    taskDate,
                    taskDesc,
                    taskStatus
                )}
                    type="checkbox"
                    id={id}
                />
                <label className={"unchecked"} id={labelID} htmlFor={id}>
                    {taskName}
                </label>
            </InputGroup>
        );
    }

    const handleChecked = (checkID, labelID, taskID, taskName, taskDate, taskDesc, taskStatus) =>
        (event) => {
            let label = document.getElementById(labelID);

            if (checkID.includes("checked")) {
                return;
            }

            if (label.className === "checked") {
                taskStatus = "Incomplete";
                label.className = "unchecked";
            } else if (label.className === "unchecked") {
                taskStatus = "Complete";
                label.className = "checked";
            }
            let fetchRequest =
                "https://planned-out-backend-jdx6.onrender.com/updatetask/:" + taskID;

            fetch(fetchRequest, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: taskID,
                    name: taskName,
                    date: taskDate,
                    desc: taskDesc,
                    status: taskStatus,
                }),
            })
                .then((res) => {
                    res.json();
                })
                .then((data) => { });

            console.log("Successfully updated task!");
        };

    return (
        <>
            {tasksDate === getToday() &&
                <Card.Title>Today's Tasks</Card.Title>

            }
            {tasksDate !== getToday() &&
                <Card.Title>Tasks for {tasksDate}</Card.Title>

            }
            <ListGroup data-testid="TaskListGroup" className="task-list no-scroll">
                {/* For loop for each task in the tasks list */}
                {tasksList
                    .filter((task) => task.taskDate === tasksDate)
                    .map((task) => (
                        <ListGroup.Item key={task._id} className="task">
                            <CheckBox
                                className="task"
                                id={"task" + tasksList.indexOf(task)}
                                taskID={task._id}
                                taskName={task.taskName}
                                taskDate={task.taskDate}
                                taskDesc={task.taskDesc}
                                taskStatus={task.taskStatus}
                            ></CheckBox>
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </>
    )
}

export default TaskList;

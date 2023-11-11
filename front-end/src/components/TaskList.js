import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

function TaskList({ username }) {
    console.log(username);
    const [tasksList, setTaskList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5050/username=?${username}`, {
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
    }, [username]);

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

            // TODO: Mark the task as incomplete in the database
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
        <ListGroup className="task-list">
            <ListGroup.Item className="task">
                <InputGroup>
                    <Form.Check
                        onClick={handleChecked("testtask", "testtasklabel")}
                        type="checkbox"
                        id="testtask"
                    />
                    <label
                        className={"unchecked"}
                        id="testtasklabel"
                        htmlFor="testtask"
                    >
                        This is a test task
                    </label>
                </InputGroup>
            </ListGroup.Item>
            {/* For loop for each task in the tasks list */}
            {tasksList.map((task) => (
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
    )
}

export default TaskList;

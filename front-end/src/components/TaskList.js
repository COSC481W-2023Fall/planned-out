import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { useState, useLayoutEffect } from "react";
import Card from "react-bootstrap/Card";

let link = localStorage.getItem("backendURL");

function TaskList({ username }) {

    const [modalShow, setModalShow] = useState(false);
    const [taskName, setTaskName] = useState([]);
    const [taskDesc, setTaskDesc] = useState([]);
    const [tasksList, setTaskList] = useState([]);
    const [tasksDate, setTasksDate] = useState([]);
    const [taskAdded, setTaskAdded] = useState([]);

    // Listen for current_tasks_day in localStorage
    window.addEventListener('current_tasks_day', () => {
        setTasksDate(localStorage.getItem("current_tasks_day"));
        console.log(localStorage.getItem("current_tasks_day"));
    });

    // Listen for task_was_added
    window.addEventListener('task_was_added', () => {
        setTaskAdded(taskAdded => {
            return [
                ...taskAdded,
                {
                    taskAdded: "yes"
                }
            ]
        })
    })

    function getToday() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
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
    }, [taskAdded, tasksDate, username]);

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Task Name: {taskName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Description: {taskDesc}
                </Modal.Body>
            </Modal>
        );
    }

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
                    <label className={"checked"} id={labelID} htmlFor={id} onClick={() => handleModal(taskName, taskDesc)}>
                        {taskName}
                    </label>
                </InputGroup>
            );
        }
        else {

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
                <label className={"unchecked"} id={labelID} htmlFor={id} onClick={() => handleModal(taskName, taskDesc)}>
                    {taskName}
                </label>
                
            </InputGroup>
        );
    }
    }

    const handleChecked = (checkID, labelID, taskID, taskName, taskDate, taskDesc, taskStatus) =>
        (event) => {
            console.log("Checked task date", taskDate);
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
                link + "updatetask/:" + taskID;

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

    const handleModal = (taskName, taskDesc) => {
        setModalShow(true);
        setTaskDesc(taskDesc);
        setTaskName(taskName);
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
                            >
                            </CheckBox>

                        </ListGroup.Item>
                ))}

            </ListGroup>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)} />
        </>
    )
}

export default TaskList;

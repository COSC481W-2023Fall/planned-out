import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, forwardRef, useRef, useImperativeHandle } from "react";

let link = localStorage.getItem("backendURL");

const TaskAdd = forwardRef((props, ref) => {
    const [taskName, setNameInput] = useState(""); // New state for the name input
    const [taskDate, setDateInput] = useState("");
    const [taskDateOut, setDateOutput] = useState("");
    const [taskDesc, setDescInput] = useState(""); // New state for the name input
    const inputBox = useRef(null);

    useImperativeHandle(ref, () => ({
        handleSubmit: handleSubmit,
        getTaskName: getTaskName
    }));

    const getTaskName = () => {
        return taskName;
    }

    const handleSubmit = (e) => {
        console.log("Test Task Add");
        if (taskName !== "" && taskDate !== "") {
            // Send the name input to the server
            fetch(link + "add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: taskName,
                    date: taskDateOut,
                    desc: taskDesc,
                    taskStatus: "incomplete",
                    user: localStorage.getItem("user")
                }),
            })
                .then((res) => {
                    res.json();
                })
            console.log("Successfully added task!");
        } else {
            alert("Task must be named and have a date.");
        }
        setNameInput("");
        setDateInput("");
        setDateOutput("");
        setDescInput("");
    };

    const handleNameInput = (e) => {
        setNameInput(e.target.value);
    };

    // Verifying date format is correct to push to database.
    const handleDateInput = (date, month, day, year) => {
        let formattedDate = month + "-" + day + "-" + year;
        console.log(formattedDate);
        setDateOutput(formattedDate);
        setDateInput(date);
    };

    const handleDescInput = (e) => {
        setDescInput(e.target.value);
    };

    return (
        <>
            <Form.Control
                data-testid="TaskNameBox"
                ref={inputBox}
                className="taskNameBox"
                value={taskName}
                placeholder="Enter task name"
                onChange={(e) => handleNameInput(e)}
            />

            <DatePicker
                showIcon
                className="taskDateBox"
                selected={taskDate}
                onChange={(date) =>
                    handleDateInput(
                        date,
                        date.getMonth() + 1,
                        date.getDate(),
                        date.getFullYear()
                    )
                }
                placeholderText="Select a date"
                dateformat="mm-dd-yyyy"
            />

            <Form.Control
                as="textarea"
                ref={inputBox}
                value={taskDesc}
                placeholder="Enter task description"
                onChange={(e) => handleDescInput(e)}
                className="taskDescBox"
            />
        </>
    )
});

export default TaskAdd;

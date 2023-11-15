import { render, fireEvent, screen } from "@testing-library/react";
import Home from "../pages/Home.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

// Mock the useNavigate hook
const navigateMock = jest.fn();
const locationMock = jest.fn();
useNavigate.mockImplementation(() => navigateMock);
useLocation.mockImplementation(() => locationMock);

test("The taskslist component is on screen", async () => {
    render(<Home />);

    const taskListGroup = screen.getByTestId("TaskListGroup");

    expect(taskListGroup).toBeInTheDocument();
});

test("Clicking 'Add a task' shows Task Add, clicking 'Submit' shows Task List", async () => {
    render(<Home />);

    // Click the 'Add a task' button
    fireEvent.click(screen.getByText("Add a task +"));
    // Get the task name box from Add Task card
    const taskNameBox = screen.getByTestId("TaskNameBox");
    // Expect it to be in the document
    expect(taskNameBox).toBeInTheDocument();

    // Task Name input
    const taskNameInput = screen.getByPlaceholderText("Enter task name");
    const dateInput = screen.getByPlaceholderText("Select a date");
    fireEvent.change(taskNameInput, { target: { value: "Take the dog for a walk" } });
    fireEvent.change(dateInput, { target: { value: "12/21/2020" } });

    // Click the 'Submit' button 
    fireEvent.click(screen.getByText("Submit!"));
    // Get the task name box from Add Task card
    const taskListGroup = screen.getByTestId("TaskListGroup");
    // Expect it to be in the document
    expect(taskListGroup).toBeInTheDocument();
});
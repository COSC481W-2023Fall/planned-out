import { render, fireEvent, screen } from "@testing-library/react";
import Home from "../pages/Home.js";

test("Connection to Add task to database", async () => {
    render(<Home />);

    const logSpy = jest.spyOn(console, 'log');
    fireEvent.click(screen.getByText("Submit!"));

    expect(logSpy).toHaveBeenCalledWith("Test Task Add")
});

test("Rendering of page", async () => { 
    render(<Home />);
    const linkElement = screen.getByText(/New Task/i);
    expect(linkElement).toBeInTheDocument();
});
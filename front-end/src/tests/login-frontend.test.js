import { render, fireEvent, screen } from "@testing-library/react";
import LoginForm from "../components/LoginForm.js";
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

test("Check Page render login button press", async () => {
    render(
        <MemoryRouter>
            (<LoginForm />);
        </MemoryRouter>
    )   

    const logSpy = jest.spyOn(console, 'log');
    fireEvent.click(screen.getByText("Login"));

    expect(logSpy).toHaveBeenCalledWith("Login failed")
});

test("Rendering page verification", async () => {
    render(<LoginForm />);
    let renderCheck = screen.getByPlaceholderText("Enter username");
    expect(renderCheck).toBeInTheDocument();
});
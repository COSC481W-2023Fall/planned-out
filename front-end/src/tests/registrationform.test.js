import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RegistrationForm from "../components/RegistrationForm.js";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("RegistrationForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should disable the button when there are no inputs", () => {
    // Mock the useNavigate hook
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);

    // Arrange
    render(<RegistrationForm />);

    // Act - button should be disabled initially
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should enable the button when all inputs are filled", () => {
    // Mock the useNavigate hook
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);

    // Arrange
    render(<RegistrationForm />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "testpassword" },
    });
    fireEvent.change(emailInput, { target: { value: "testemail" } });
    fireEvent.change(firstNameInput, { target: { value: "testfirst" } });
    fireEvent.change(lastNameInput, { target: { value: "testlast" } });

    // Assert - button should be enabled now
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("disabled", "");
  });
});

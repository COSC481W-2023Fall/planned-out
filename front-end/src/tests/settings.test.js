import { render, fireEvent, screen } from "@testing-library/react";
import Settings from "../pages/Settings.js";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

// Mock the useNavigate hook
const navigateMock = jest.fn();
useNavigate.mockImplementation(() => navigateMock);

test("Settings page links render", async () => {
    render(<Settings />);

    const security = screen.getByTestId("Security");
    const profile = screen.getByTestId("Profile");
    const appearance = screen.getByTestId("Appearance");
    const privacy = screen.getByTestId("Privacy");

    expect(security).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(appearance).toBeInTheDocument();
    expect(privacy).toBeInTheDocument();
});

test("Security settings render", async () => {
    render(<Settings />);

    // Click security settings link
    fireEvent.click(screen.getByTestId("Security"));

    // Expect the "New Password" label to be rendered
    expect(screen.getByText("New Password")).toBeInTheDocument();
});

test("Profile settings render", async () => {
    render(<Settings />);

    // Click profile settings link
    fireEvent.click(screen.getByTestId("Profile"));

    // Expect the "Profile picture" label to be rendered
    expect(screen.getByText("Profile picture")).toBeInTheDocument();
});

test("Appearance settings render", async () => {
    render(<Settings />);

    // Click apperance settings link
    fireEvent.click(screen.getByTestId("Appearance"));

    // Expect the accent color title to be rendered
    expect(screen.getByText("Accent Color")).toBeInTheDocument();
});

test("Privacy settings render", async () => {
    render(<Settings />);

    // Click privacy settings link
    fireEvent.click(screen.getByTestId("Privacy"));

    // Expect the delete all tasks button to be rendered
    expect(screen.getByTestId("DeleteTasksButton")).toBeInTheDocument();
    // Expect the delete account button to be rendered
    expect(screen.getByTestId("DeleteAccountButton")).toBeInTheDocument();
});
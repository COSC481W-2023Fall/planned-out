import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";


test("Tasks render on page", () => {
  render(<Home/>);

  const firstTask = screen.getByText(/This is a test task/i);

  expect(firstTask).toBeInTheDocument();
});

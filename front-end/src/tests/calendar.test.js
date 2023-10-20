import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

test("Calendar is rendered and correct month and year is displayed", () => {
  render(<Home />);

  const date = new Date();
  const monthName = date.toLocaleString("en-US", {
    month: "long",
  });
  const year = date.getFullYear();
  const calendar = screen.getByText(monthName + " " + year);
  console.log(monthName + " " + year);
  expect(calendar).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  console.log(linkElement);
  expect(linkElement).toBeInTheDocument();
});
//test for viewing an element onscreen can be combo's with example.test.js

import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

test("Button puts 'Hello World!' in console", () => {
  render(<App />);

  fireEvent.click(screen.getByText("Click Me"));

  expect(console.log("Hello World!"));
});

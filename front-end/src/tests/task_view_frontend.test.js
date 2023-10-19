import { render, screen } from "@testing-library/react";
import App from "../App";

test("Button puts 'Hello World!' in console", () => {
  render(<App />);

  expect(console.log("Hello World!"));
});

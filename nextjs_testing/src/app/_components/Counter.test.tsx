import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";
describe("Counter Component", () => {
  it("renders a heading 1", () => {
    render(<Counter />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("renders two buttons", () => {
    render(<Counter />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("render heading text", () => {
    render(<Counter />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch(/Count: \d+/);
  });

  it("render button text", () => {
    render(<Counter />);
    const buttonDecre = screen.getByTestId("decrease");
    expect(buttonDecre).toContainHTML("-");
    const buttonIncre = screen.getByTestId("increase");
    expect(buttonIncre).toContainHTML("+");
  });

  it("click increment button", () => {
    render(<Counter />);
    const buttonIncre = screen.getByTestId("increase");

    for (let i = 0; i < 3; i++) {
      fireEvent.click(buttonIncre);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent(`Count: ${i + 1}`);
    }
  });

  it("click decrement button", () => {
    render(<Counter />);
    const buttonDecre = screen.getByTestId("decrease");

    for (let i = 0; i < 3; i++) {
      fireEvent.click(buttonDecre);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent(`Count: ${0 - i - 1}`);
    }
  });
});

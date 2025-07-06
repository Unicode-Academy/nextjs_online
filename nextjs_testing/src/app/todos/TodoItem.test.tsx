import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
describe("TodoItem Component", () => {
  it("prop render value 1", () => {
    render(
      <>
        <TodoItem todo="Todo 1" />
        <TodoItem todo="Todo 2" />
        <TodoItem todo="Todo 3" />
      </>
    );
    const todoItems = screen.getAllByTestId("todo-item");
    const todoItemsMap = todoItems.map((item) => item.textContent);
    expect(todoItemsMap).toEqual(["Todo 1", "Todo 2", "Todo 3"]);
  });

  //   it("prop render value 2", () => {
  //     render(<TodoItem todo="Todo 2" />);
  //     expect(screen.getByTestId("todo-item")).toContainHTML("Todo 2");
  //   });

  //   it("prop render value 3", () => {
  //     render(<TodoItem todo="Todo 3" />);
  //     expect(screen.getByTestId("todo-item")).toContainHTML("Todo 3");
  //   });
});

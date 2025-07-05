import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
describe("TodoList Component", () => {
  it("get input value", () => {
    render(<TodoList />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, {
      target: {
        value: "Todo 1",
      },
    });
    expect(input).toHaveValue("Todo 1");
  });

  it("submit todo", () => {
    render(<TodoList />);

    fireEvent.change(screen.getByTestId("todo-input"), {
      target: {
        value: "Todo 1",
      },
    });
    fireEvent.submit(screen.getByTestId("todo-form"));

    const todoList = screen.getByTestId("todo-list");
    expect(todoList).toContainHTML("Todo 1");

    fireEvent.change(screen.getByTestId("todo-input"), {
      target: {
        value: "Todo 2",
      },
    });
    fireEvent.submit(screen.getByTestId("todo-form"));
    expect(todoList).toContainHTML("Todo 2");

    const todoListData = ["Todo 1", "Todo 2"];
    //Kiểm tra danh sách
    const todoItems = screen.getAllByTestId("todo-item");
    const todoItemsMap = todoItems.map((item) => item.textContent);
    expect(todoItemsMap).toEqual(todoListData);
  });
});

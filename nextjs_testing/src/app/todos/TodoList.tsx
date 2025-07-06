"use client";

import { useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [value, setValue] = useState<string>("");
  const [todoList, setTodoList] = useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodoList([...todoList, value]);
    setValue("");
  };
  return (
    <div>
      <h1>TodoList</h1>
      <ul data-testid="todo-list">
        {todoList.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>
      <form data-testid="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a todo..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          data-testid="todo-input"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

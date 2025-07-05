"use client";

import { useState } from "react";

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
          <li key={index} data-testid="todo-item">
            {todo}
          </li>
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

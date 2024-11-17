"use client";

import { useState } from "react";
import useSWR from "swr";

const getTodoList = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
const getTodoDetail = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
export default function TodoList() {
  const [todoId, setTodoId] = useState(0);
  const { data, isLoading, error } = useSWR("/todos", getTodoList);
  const { data: todoDetail, isLoading: loadingDetail } = useSWR(
    todoId ? `/todos/${todoId}` : null,
    () => getTodoDetail(todoId)
  );

  const handleClick = (id: number) => {
    setTodoId(id);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      {data?.map((todo: { id: number; title: string }) => (
        <h2 key={todo.id}>
          {todo.title}
          <button onClick={() => handleClick(todo.id)}>Status</button>
          {todoId === todo.id && !loadingDetail ? (
            <div>{todoDetail?.completed ? "Active" : "Inactive"}</div>
          ) : null}
        </h2>
      ))}
    </div>
  );
}

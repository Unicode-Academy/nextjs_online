"use client";
import { useEffect, useState } from "react";
import Delete from "./Delete";
import View from "./View";
import { useSearchParams } from "next/navigation";

type Todo = {
  id: string;
  title: string;
};
export default function TodoList({ todoList }: { todoList: Todo[] }) {
  const [todoListState, setTodoList] = useState(todoList);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  useEffect(() => {
    const searchTodoList = async () => {
      const response = await fetch(`http://localhost:3001/todos?q=${search}`);
      const data = await response.json();
      setTodoList(data);
    };
    searchTodoList();
  }, [search]);
  return (
    <ul className="list-disc list-inside mt-3">
      {todoListState.map((todo: { id: string; title: string }) => (
        <li key={todo.id}>
          {todo.title} <View id={todo.id} /> <Delete id={todo.id} />
        </li>
      ))}
    </ul>
  );
}

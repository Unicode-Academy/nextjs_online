"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getTodo, getTodoList } from "../redux/slice/todoSlice";

export default function TodoList() {
  const { todoList, status, todo } = useSelector(
    (state: RootState) => state.todo
  );
  const dispatch: AppDispatch = useDispatch();
  const handleViewTodo = (id: number) => {
    dispatch(getTodo(id));
  };
  useEffect(() => {
    dispatch(getTodoList());
  }, []);

  if (Object.keys(todo).length) {
    return (
      <div>
        <h1 className="text-3xl">Todo</h1>
        <div className="text-2xl">{(todo as { title: string }).title}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl">TodoList</h1>
      {status === "pending" ? (
        <div className="text-2xl">Loading...</div>
      ) : status === "error" ? (
        <div className="text-2xl">Fail to fetch /todo</div>
      ) : (
        todoList.map((todo: { id: number; title: string }) => (
          <div className="text-2xl" key={todo.id}>
            {todo.title}{" "}
            <button className="border" onClick={() => handleViewTodo(todo.id)}>
              View
            </button>
          </div>
        ))
      )}
    </div>
  );
}

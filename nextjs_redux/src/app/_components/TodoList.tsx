"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getTodoList } from "../redux/slice/todoSlice";

export default function TodoList() {
  const { todoList, status } = useSelector((state: RootState) => state.todo);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodoList());
  }, []);

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
            {todo.title}
          </div>
        ))
      )}
    </div>
  );
}

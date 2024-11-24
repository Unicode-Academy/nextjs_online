"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
const LIMIT = 20;
const getTodoList = async (search: string = "", page: number = 1) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?q=${search}&_page=${page}&_limit=${LIMIT}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  const count = response.headers.get("x-total-count");
  return { data, count };
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
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const [todoId, setTodoId] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const { data, isLoading, error, mutate } = useSWR(
    "/todos?page=" + currentPage,
    async () => {
      const { data, count } = await getTodoList(search, currentPage);
      setTotalPage(Math.ceil(Number(count) / LIMIT));
      return data;
    }
  );
  const { data: todoDetail, isLoading: loadingDetail } = useSWR(
    todoId ? `/todos/${todoId}` : null,
    () => getTodoDetail(todoId)
  );

  const handleClick = (id: number) => {
    setTodoId(id);
  };

  useEffect(() => {
    mutate();
  }, [search, mutate]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h4>Total: {totalPage}</h4>
      {data?.map((todo: { id: number; title: string }) => (
        <h2 key={todo.id}>
          {todo.title}
          <button onClick={() => handleClick(todo.id)}>Status</button>
          {todoId === todo.id && !loadingDetail ? (
            <div>{todoDetail?.completed ? "Active" : "Inactive"}</div>
          ) : null}
        </h2>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
}

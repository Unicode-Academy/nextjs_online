import Link from "next/link";
import TodoAdd from "./_components/TodoAdd";
import SearchForm from "./_components/SearchForm";

const getTodoList = async (q: string = "") => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/todos?q=${q}`
  );
  if (!response.ok) {
    throw new Error("Có lỗi khi lấy dữ liệu /todos");
  }
  return response.json();
};
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  content: string;
};
export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const q = (await searchParams).q || "";
  const todoList = await getTodoList(q);
  return (
    <div>
      <h1>Todo List: {q}</h1>
      <SearchForm />
      {todoList.map((todo: Todo) => (
        <Link href={`/todos/${todo.id}`} key={todo.id}>
          <h3>{todo.title}</h3>
        </Link>
      ))}
      <TodoAdd />
    </div>
  );
}

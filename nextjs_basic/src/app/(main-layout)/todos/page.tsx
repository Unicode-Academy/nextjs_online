import Link from "next/link";
// import TodoAdd from "./_components/TodoAdd";
import SearchForm from "./_components/SearchForm";
import TodoAdd2 from "./_components/TodoAdd2";

const getTodoList = async (q: string = "") => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/todos?q=${q}`,
    {
      next: {
        tags: ["todos"],
      },
    }
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
        <h3 key={todo.id}>
          <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
          <Link
            className="fs-6 float-end ms-2"
            href={`/todos/delete/${todo.id}`}
          >
            Delete
          </Link>
          <Link className="fs-6 float-end" href={`/todos/edit/${todo.id}`}>
            Edit
          </Link>
        </h3>
      ))}
      {/* <TodoAdd /> */}
      <TodoAdd2 />
    </div>
  );
}

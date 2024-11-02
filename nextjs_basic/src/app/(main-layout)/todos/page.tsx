import Link from "next/link";
import TodoAdd from "./_components/TodoAdd";

const getTodoList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/todos`);
  return response.json();
};
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  content: string;
};
export default async function TodosPage() {
  const todoList = await getTodoList();
  return (
    <div>
      <h1>Todo List</h1>
      {todoList.map((todo: Todo) => (
        <Link href={`/todos/${todo.id}`} key={todo.id}>
          <h3>{todo.title}</h3>
        </Link>
      ))}
      <TodoAdd />
    </div>
  );
}

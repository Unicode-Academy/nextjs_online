import Link from "next/link";
import { Todo } from "../page";

type Params = {
  params: {
    id: string;
  };
};
const getTodo = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/todos/${id}`
  );
  return response.json();
};
export default async function TodoDetailPage({ params }: Params) {
  const { id } = await params;
  const todo: Todo = await getTodo(id);
  return (
    <div>
      <h1>{todo.title}</h1>
      <p>Detail: {todo.content}</p>
      <p>Status: {todo.completed.toString()}</p>
      <h4>
        <Link href="/todos">Back</Link>
      </h4>
    </div>
  );
}

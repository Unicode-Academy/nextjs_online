import TodoUpdate from "./TodoUpdate";

type Params = {
  params: Promise<{ id: string }>;
};
export type Todo = {
  id: string;
  title: string;
  content: string;
  completed: boolean;
};
const getTodo = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/todos/${id}`,
    {
      next: {
        tags: ["todos"],
      },
    }
  );
  if (!response.ok) {
    throw new Error("Có lỗi khi lấy dữ liệu /todos/" + id);
  }
  return response.json();
};
export default async function TodoEditPage({ params }: Params) {
  const { id } = await params;
  const todo: Todo = await getTodo(id);
  return (
    <div>
      <h1>Edit Todo</h1>
      <TodoUpdate todo={todo} />
    </div>
  );
}

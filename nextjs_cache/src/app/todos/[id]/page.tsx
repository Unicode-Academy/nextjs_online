import { notFound } from "next/navigation";
export async function generateStaticParams() {
  const response = await fetch(`http://localhost:3001/todos`, {
    cache: "force-cache",
    next: {
      tags: ["todo-list"],
    },
  });

  const todoList = await response.json();
  return todoList.map((todo: { id: string }) => ({
    id: todo.id.toString(),
  }));
}

const getTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3001/todos/${id}`, {
    cache: "force-cache",
    next: {
      tags: [`todo-${id}`, "todo"],
    },
  });
  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  return data;
};
export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const todo = await getTodo(id);
  if (!todo) {
    notFound();
  }
  return (
    <div className="w-3/4 mx-auto py-3">
      <h1 className="text-4xl">{todo.title}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ab
        animi ut nam id? Tempora ipsum mollitia vitae animi incidunt ullam id
        illo, quos, quasi sint ex veniam, nostrum magni.
      </p>
    </div>
  );
}

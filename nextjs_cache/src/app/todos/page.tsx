// "use cache";

import Form from "./_components/Form";
import SearchForm from "./_components/SearchForm";
import TodoList from "./_components/TodoList";
const getTodoList = async () => {
  const response = await fetch(`http://localhost:3001/todos`, {
    // cache: "force-cache",
    // next: {
    //   tags: ["todo-list"],
    // },
  });
  return response.json();
};

// const getPosts = async () => {
//   const response = await fetch(`http://localhost:3001/posts`, {
//     cache: "force-cache",
//     next: {
//       tags: ["post-list"],
//     },
//   });
//   return response.json();
// };

export default async function TodoPage() {
  "use cache";
  // cacheLife("minutes");
  const todoList = await getTodoList();
  // const postList = await getPosts();
  return (
    <div className="w-3/4 mx-auto py-3">
      <h2 className="text-4xl">Todo List</h2>
      <SearchForm />
      <TodoList todoList={todoList} />
      {/* <h2 className="text-4xl">Post List</h2>
      <ul className="list-disc list-inside mt-3">
        {postList.map((post: { id: string; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}
      <Form />
    </div>
  );
}

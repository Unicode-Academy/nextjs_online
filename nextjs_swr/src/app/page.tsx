"use client";

import useSWR from "swr";
const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
export default function HomePage() {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR("/posts", getPosts, {
    fallbackData: [],
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h1>HomePage</h1>
      {posts.map((post: { id: number; title: string; body: string }) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

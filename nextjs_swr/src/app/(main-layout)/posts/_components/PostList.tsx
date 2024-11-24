"use client";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import PostAdd from "./PostAdd";
const getPosts = async () => {
  const response = await fetch("http://localhost:3001/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
export default function PostList() {
  const {
    data: posts,
    isLoading,
    error,
    // mutate,
  } = useSWR("/posts", getPosts, {
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    // refreshInterval: 1000,
  });
  const handleReload = () => {
    mutate(
      "/posts",
      (data: { id: number; title: string; body: string }[] | undefined) => {
        if (data) {
          return [...data, { id: 4, title: "New Post", body: "New Body" }];
        }
        return data;
      },
      {
        revalidate: false,
      }
    );
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleReload}>Reload</button>
      {posts.map((post: { id: number; title: string; body: string }) => (
        <div key={post.id}>
          <h2>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
        </div>
      ))}
      <PostAdd />
    </div>
  );
}

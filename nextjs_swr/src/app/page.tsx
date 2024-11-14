"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode1.com/posts"
        );
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);
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

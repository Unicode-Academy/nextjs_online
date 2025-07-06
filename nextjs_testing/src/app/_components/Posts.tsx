"use client";

import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <h1>Posts</h1>
      {/* <button onClick={fetchPosts}>Refresh</button> */}

      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        posts.map((post: { id: number; title: string; body: string }) => (
          <div key={post.id}>
            <h2 data-testid="post-title">{post.title}</h2>
            <p data-testid="post-body">{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
}

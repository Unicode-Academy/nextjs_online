"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
export type Post = {
  id: string;
  title: string;
  content: string;
};

export default function PostList() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [error, setError] = useState<Error>(null as unknown as Error);
  const getPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/posts`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPostList(data);
    } catch (error: unknown) {
      setError(error as Error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  if (error) {
    return <h3>{error.message}</h3>;
  }
  return (
    <div>
      <h1>Danh sách bài viết</h1>
      {postList.map((post: Post) => (
        <h3 key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
      ))}
    </div>
  );
}

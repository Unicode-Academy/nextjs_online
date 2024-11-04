"use client";

import { useEffect, useState } from "react";
import { Post } from "./PostList";
import { notFound } from "next/navigation";
import NotFound from "@/app/not-found";

export default function PostDetail({ post: postId }: { post: string }) {
  const [post, setPost] = useState<Post>({} as Post);
  const [error, setError] = useState<Error>(null as unknown as Error);
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error: unknown) {
        setError(error as Error);
      }
    };
    getPost();
  }, [postId]);
  if (error) {
    return <NotFound />;
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

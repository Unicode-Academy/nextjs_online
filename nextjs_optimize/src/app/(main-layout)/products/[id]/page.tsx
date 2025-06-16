import { Metadata } from "next";
import { Props } from "../page";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { id } = await params;
  const post = await getPost(Number(id));
  if (!post) {
    return;
  }
  return {
    title: post.title,
    description: post.body.slice(0, 150),
  };
}
const getPost = React.cache(async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    return false;
  }
  return response.json();
});
export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(Number(id));
  if (!post) {
    return notFound();
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

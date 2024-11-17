"use client";

import { FormEvent } from "react";
import { mutate } from "swr";

export default function PostAdd() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    if (!response.ok) {
      alert("Failed to add post");
    }
    const newPost = await response.json();
    mutate(
      "/posts",
      (data: { id: number; title: string; body: string }[] | undefined) => {
        if (data) {
          return [...data, newPost];
        }
        return data;
      },
      {
        revalidate: false,
      }
    );
    (e.target as HTMLFormElement).reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">Title</label>
        <input type="text" name="title" placeholder="Title..." required />
      </div>
      <div>
        <label htmlFor="">Body</label>
        <input type="text" name="body" placeholder="Body..." required />
      </div>
      <button>Add</button>
    </form>
  );
}

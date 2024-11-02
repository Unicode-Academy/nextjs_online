"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function TodoAdd() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title");
    const content = formData.get("content");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/todos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, completed: false }),
      }
    );
    if (response.ok) {
      router.refresh();
      (e.target as HTMLFormElement).reset();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control"
          required
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          className="form-control"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

"use client";

import { revalidateTag } from "@/app/utils/cache";
import { useRouter } from "next/navigation";
// import { revalidateTag } from "next/cache";
import { FormEvent } from "react";

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title");
    const response = await fetch(`http://localhost:3001/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (response.ok) {
      //revalidate cache
      revalidateTag("todo-list");
      router.refresh();
      (e.target as HTMLFormElement).reset();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title..."
        className="border-2"
      />
      <button type="submit" className="border-2">
        Add Todo
      </button>
    </form>
  );
}

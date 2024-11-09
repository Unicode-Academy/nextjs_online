"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const create = async (formData: FormData) => {
  const title = formData.get("title");
  const response = await fetch(`http://localhost:3001/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (response.ok) {
    // revalidatePath(`/todos`);
    revalidateTag("todo-list");
  }
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // revalidateTag("todo-list"); //Xóa danh sách
    revalidatePath(`/todos`);
    revalidateTag(`todo-${id}`); //Xóa chi tiết
  }
};

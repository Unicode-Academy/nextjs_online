"use server";

import { revalidateTag } from "next/cache";
interface Error {
  status?: number;
  message?: string;
}
export const create = async (formData: FormData) => {
  try {
    const title = formData.get("title");
    const content = formData.get("content");
    if (!title || !content) {
      const error = new Error("Title and content are required");
      (error as Error).status = 400;
      throw error;
    }
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
    if (!response.ok) {
      const error = new Error("Failed to create todo");
      (error as Error).status = 404;
      throw error;
    }
    revalidateTag("todos");
    return {
      success: response.ok,
      message: "Todo created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).status
        ? (error as Error).message
        : "Something went wrong",
    };
  }
};

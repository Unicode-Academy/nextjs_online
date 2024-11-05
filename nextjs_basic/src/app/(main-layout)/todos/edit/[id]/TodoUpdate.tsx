"use client";

import { useState } from "react";
import { update } from "../../action";
import { Todo } from "./page";
import { useRouter } from "next/navigation";

export default function TodoUpdate({ todo }: { todo: Todo }) {
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();
  return (
    <form
      action={async (formData: FormData) => {
        formData.append("id", todo.id);
        const response: { success: boolean; message: string | undefined } =
          await update(formData);
        if (!response.success) {
          setMsg(response.message as string);
        } else {
          router.push(`/todos`);
        }
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="form-control"
        defaultValue={todo.title}
      />
      <input
        type="text"
        name="content"
        placeholder="Content"
        className="form-control"
        defaultValue={todo.content}
      />
      <label className="d-block">
        <input
          type="checkbox"
          defaultChecked={todo.completed}
          name="completed"
        />
        Completed
      </label>
      <button type="submit">Update</button>
      {msg && <span className="text-danger d-block">{msg}</span>}
    </form>
  );
}

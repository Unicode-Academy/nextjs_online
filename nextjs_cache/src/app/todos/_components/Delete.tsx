"use client";

import { deleteTodo } from "../action";

export default function Delete({ id }: { id: string }) {
  return (
    <button className="border-2" onClick={() => deleteTodo(id)}>
      Delete
    </button>
  );
}

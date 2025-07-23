"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function TaskPage() {
  const tasks = useQuery(api.todos.get);
  console.log(tasks);
  return (
    <div className="py-20">
      <h1 className="text-3xl">Task</h1>
    </div>
  );
}

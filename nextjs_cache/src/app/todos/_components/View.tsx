"use client";

import { useRouter } from "next/navigation";

export default function View({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button className="border-2" onClick={() => router.push(`/todos/${id}`)}>
      View
    </button>
  );
}

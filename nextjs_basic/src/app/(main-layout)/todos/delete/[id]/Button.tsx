"use client";

import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  return (
    <button
      className="btn btn-danger"
      type="button"
      onClick={() => router.push(`/todos`)}
    >
      Cancel
    </button>
  );
}

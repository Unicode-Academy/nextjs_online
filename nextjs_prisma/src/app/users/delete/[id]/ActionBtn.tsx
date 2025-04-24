"use client";

import { useRouter } from "next/navigation";
import { deleteUser } from "./action";

export default function ActionBtn({ id }: { id: number }) {
  const router = useRouter();
  return (
    <>
      <button onClick={async () => await deleteUser(id)}>Yes</button>
      <button onClick={() => router.push(`/users`)}>No</button>
    </>
  );
}

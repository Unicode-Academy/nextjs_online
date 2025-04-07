"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div>
        <h2>Đã đăng nhập: {session.user?.name}</h2>
        <button onClick={() => router.push(`/api/auth/signout`)}>Logout</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn()}>Login</button>
    </div>
  );
}

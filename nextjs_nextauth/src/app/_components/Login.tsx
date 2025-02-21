"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <h2>Đã đăng nhập: {session.user?.name}</h2>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn()}>Login</button>
    </div>
  );
}

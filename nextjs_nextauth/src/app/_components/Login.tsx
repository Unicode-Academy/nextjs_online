"use client";

import { Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data } = useSession();

  const session = data as Session & { forceLogout: boolean };
  const router = useRouter();

  useEffect(() => {
    if (session?.forceLogout as boolean) {
      // router.push(`/auth/logout`);
      signOut({ callbackUrl: "/auth/login", redirect: true });
    }
  }, [session]);
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

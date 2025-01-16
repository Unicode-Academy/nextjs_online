import { getUser } from "@/app/utils/auth";
import Link from "next/link";
import React from "react";
export default async function AccountPage() {
  const user = await getUser();
  return (
    <div>
      <h1>My Account</h1>
      <h2>Chào bạn: {user.name}</h2>
      <h2>
        <Link href="/auth/logout">Đăng xuất</Link>
      </h2>
    </div>
  );
}

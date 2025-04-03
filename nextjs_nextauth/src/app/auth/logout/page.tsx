"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { signOut } from "next-auth/react";
export default function LogoutPage() {
  return (
    <div className="w-50 mx-auto text-center">
      <h1>Bạn có chắc chắn?</h1>
      <button className="btn btn-danger" onClick={() => signOut({
        callbackUrl: "/",
        redirect: true
      })}>
        Đăng xuất
      </button>
    </div>
  );
}

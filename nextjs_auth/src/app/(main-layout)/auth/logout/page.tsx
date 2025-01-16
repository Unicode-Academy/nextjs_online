"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const removeToken = async () => {
  await fetch(`/api/cookie?key=token`, {
    method: "DELETE",
  });
  await fetch(`/api/cookie?key=refresh_token`, {
    method: "DELETE",
  });
};
export default function LogoutPage() {
  //Xóa token trong cookie
  //Call API logout ==> Yêu cầu back-end xử lý
  const router = useRouter();
  useEffect(() => {
    removeToken().then(() => {
      router.push("/auth/login");
      // window.location.href = "/auth/login";
    });
  }, [router]);
  return <h2>Đang đăng xuất...</h2>;
}

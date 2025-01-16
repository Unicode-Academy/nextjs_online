"use client";

import { makeRefreshToken } from "@/app/utils/auth";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import Logo from "./Logo";
import { AppContext } from "./Provider";
import { usePathname } from "next/navigation";
import { FetchWrapper } from "@/app/utils/fetch-wrapper";
const fetchWrapper = new FetchWrapper(
  process.env.NEXT_PUBLIC_SERVER_AUTH_API as string
);
const fetchWrapperInternal = new FetchWrapper();
const getUser = async (
  accessToken: string | null,
  refreshToken: string | null
) => {
  // const accessToken = await getToken();
  if (!accessToken) {
    return;
  }

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_SERVER_AUTH_API}/auth/profile`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  // );
  const response = await fetchWrapper.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    //Call api refresh token
    // const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      // deleteToken();
      window.location.href = "/auth/logout";
      return;
    }
    const newToken = await makeRefreshToken(refreshToken);
    if (newToken) {
      // await fetch(`/api/cookie?key=token`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ value: newToken.access_token, maxAge: 86400 }),
      // });
      await fetchWrapperInternal.post("/api/cookie?key=token", {
        value: newToken.access_token,
        maxAge: 86400,
      });
      return getUser(newToken.access_token, newToken.refresh_token);
    } else {
      // deleteToken();
      window.location.href = "/auth/logout";
      return;
    }
  }
  return response.data;
};
type User = {
  [key: string]: string;
};
export default function Header() {
  const [user, setUser] = useState<User>({});
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, refreshToken } = use(AppContext);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/auth/logout") {
      getUser(accessToken, refreshToken)
        .then((data) => setUser(data))
        .finally(() => setIsLoading(false));
    }
  }, [accessToken, refreshToken]);

  return (
    <div
      className="row border mt-2 align-items-center"
      suppressHydrationWarning
    >
      <div className="col-3">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="col-9">
        <ul className="d-flex gap-2 list-unstyled justify-content-end align-items-center mb-0">
          {isLoading ? null : user ? (
            <>
              <li>Chào bạn: {user.name}</li>
              <Link href={"/my-account"}>Tài khoản</Link>
              <Link href={"/auth/logout"}>Đăng xuất</Link>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/login">Đăng nhập</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

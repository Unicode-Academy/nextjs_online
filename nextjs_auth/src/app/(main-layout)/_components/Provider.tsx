"use client";
import { getRefreshToken, getToken, makeRefreshToken } from "@/app/utils/auth";
import React, { useEffect, useState } from "react";
import { FetchWrapper } from "@/app/utils/fetch-wrapper";
import { useRouter } from "next/navigation";
type AppContext = {
  accessToken: null | string;
  refreshToken: null | string;
};
const fetchWrapper = new FetchWrapper(
  process.env.NEXT_PUBLIC_SERVER_AUTH_API as string
);
export const AppContext = React.createContext({} as AppContext);
export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [accessToken, setToken] = useState<null | string>(null);
  const [refreshToken, setRefreshToken] = useState<null | string>(null);
  const router = useRouter();
  // const pathname = usePathname();
  //Làm sao lấy được token trong này
  useEffect(() => {
    const showToken = async () => {
      const token = await getToken();
      const refreshToken = await getRefreshToken();
      if (token) {
        setToken(token);
      }
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
    };
    showToken();
  }, []);

  useEffect(() => {
    const handleRefreshToken = async () => {
      if (accessToken && refreshToken) {
        const response = await fetchWrapper.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 401) {
          const newToken = await makeRefreshToken(refreshToken!);
          if (newToken) {
            await fetch(`/api/cookie?key=token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                value: (newToken as { access_token: string }).access_token,
                maxAge: 86400,
              }),
            });
          } else {
            router.push("/auth/logout");
          }
        }
      }
    };
    handleRefreshToken();
  }, [accessToken, refreshToken]);
  console.log("provider");

  return (
    <AppContext value={{ accessToken, refreshToken }}>{children}</AppContext>
  );
}

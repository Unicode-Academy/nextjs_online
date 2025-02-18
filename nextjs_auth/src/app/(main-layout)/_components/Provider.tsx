"use client";
import {
  getRefreshToken,
  getToken,
  makeRefreshToken,
  saveToken,
} from "@/app/utils/auth";
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
  const checkAccessTokenAndRefreshToken = async (
    accessToken: string,
    refreshToken: string
  ) => {
    const response = await fetchWrapper.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 401) {
      const newToken = await makeRefreshToken(refreshToken!);
      if (newToken) {
        await saveToken(newToken.access_token);
      } else {
        router.push("/auth/logout");
      }
    }
  };

  // const pathname = usePathname();
  //Làm sao lấy được token trong này
  useEffect(() => {
    const sendAccessTokenAndRefreshToken = async () => {
      const token = await getToken();
      const refreshToken = await getRefreshToken();
      if (token && refreshToken) {
        setToken(token);
        setRefreshToken(refreshToken);
        checkAccessTokenAndRefreshToken(accessToken!, refreshToken!);
      }
    };
    sendAccessTokenAndRefreshToken();
  }, []);
  return (
    <AppContext value={{ accessToken, refreshToken }}>{children}</AppContext>
  );
}

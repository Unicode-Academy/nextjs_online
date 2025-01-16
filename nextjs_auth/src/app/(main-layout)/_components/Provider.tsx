"use client";
import { getRefreshToken, getToken } from "@/app/utils/auth";
import React, { useEffect, useState } from "react";
type AppContext = {
  accessToken: null | string;
  refreshToken: null | string;
};
export const AppContext = React.createContext({} as AppContext);
export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [accessToken, setToken] = useState<null | string>(null);
  const [refreshToken, setRefreshToken] = useState<null | string>(null);
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
  return (
    <AppContext value={{ accessToken, refreshToken }}>{children}</AppContext>
  );
}

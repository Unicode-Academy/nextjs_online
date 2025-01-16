"use client";

import { makeRefreshToken } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { AppContext } from "./Provider";

export default function RefreshToken() {
  const router = useRouter();
  const { refreshToken } = use(AppContext);
  useEffect(() => {
    const handleRefreshToken = async () => {
      if (!refreshToken) {
        return;
      }
      const newToken = await makeRefreshToken(refreshToken);
      if (newToken) {
        await fetch(`/api/cookie?key=token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: newToken.access_token, maxAge: 86400 }),
        });
        router.refresh();
      } else {
        router.push(`/auth/logout`);
      }
    };
    handleRefreshToken();
  }, [refreshToken]);
  return null;
}

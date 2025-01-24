"use client";

import { useFetch } from "@/app/hooks/use-fetch";
import { useEffect, useState } from "react";

export default function Header2() {
  const { fetchWrapper, status } = useFetch(
    process.env.NEXT_PUBLIC_SERVER_AUTH_API as string
  );
  const [user, setUser] = useState<{ name: string } | undefined>(
    {} as { name: string }
  );
  useEffect(() => {
    if (status !== "success") return;
    const getUser = async () => {
      const response = await fetchWrapper.get<{ name: string }>(
        "/auth/profile"
      );
      if (response) {
        setUser(response?.data);
      }
    };
    getUser();
  }, [status]);
  console.log("header");
  const handleClick = async () => {
    const response = await fetchWrapper.get<{ name: string }>("/auth/profile");
    if (response) {
      setUser(response?.data);
    }
  };
  return (
    <div>
      <h2>Chào bạn: {user?.name}</h2>
      <button onClick={handleClick}>Reload</button>
    </div>
  );
}

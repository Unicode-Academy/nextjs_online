"use client";
import { useFetch } from "@/app/hooks/use-fetch";
import { FetchWrapper } from "@/app/utils/fetch-wrapper";
// import { useEffect, useState } from "react";
//useFetch(callback, options)
const fetchOptions = {
  baseUrl: process.env.NEXT_PUBLIC_SERVER_AUTH_API as string,
  isAuth: true,
};
export default function Header2() {
  // const { fetchWrapper, status } = useFetch(
  //   process.env.NEXT_PUBLIC_SERVER_AUTH_API as string
  // );
  // const [user, setUser] = useState<{ name: string } | undefined>(
  //   {} as { name: string }
  // );
  // useEffect(() => {
  //   if (status !== "success") return;
  //   const getUser = async () => {
  //     const response = await fetchWrapper.get<{ name: string }>(
  //       "/auth/profile"
  //     );
  //     if (response) {
  //       setUser(response?.data);
  //     }
  //   };
  //   getUser();
  // }, [status]);
  // console.log("header");
  // const handleClick = async () => {
  //   const response = await fetchWrapper.get<{ name: string }>("/auth/profile");
  //   if (response) {
  //     setUser(response?.data);
  //   }
  // };
  const { data: user } = useFetch<{ name: string }>(
    (fetchWrapper: FetchWrapper) => {
      return fetchWrapper.get("/auth/profile");
    },
    fetchOptions
  ) as {
    data: { name: string } | undefined;
  };

  // const { data: todos } = useFetch<{ title: string }>(
  //   (fetchWrapper: FetchWrapper) => {
  //     return fetchWrapper.get("https://jsonplaceholder.typicode.com/todos");
  //   }
  // ) as { data: { title: string }[] | undefined };

  const handleClick = async () => {
    // const fetchWrapper = new FetchWrapper(
    //   process.env.NEXT_PUBLIC_SERVER_AUTH_API as string,
    //   {
    //     Authorization: `Bearer 1111`,
    //   }
    // );
    // fetchWrapper.refreshToken("2222");
    // const response = await fetchWrapper?.get("/auth/profile");
    // console.log(response);
  };

  return (
    <div>
      <h2>Chào bạn: {user?.name}</h2>
      <button onClick={handleClick}>Reload</button>
    </div>
  );
}

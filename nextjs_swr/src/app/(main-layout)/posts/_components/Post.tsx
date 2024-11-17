"use client";

import { notFound } from "next/navigation";
import useSWR from "swr";
interface CustomError extends Error {
  status?: number;
}
const getPost = async ({ id, token }: { id: string; token?: string }) => {
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`http://localhost:3001/posts/${id}`, {
    headers,
  });
  if (response.status === 404) {
    const error: CustomError = new Error("Post not found");
    error.status = response.status;
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
export default function Post({ id }: { id: string }) {
  // const [token, setToken] = useState<string>("");
  const { data, isLoading, error } = useSWR(`/posts/${id}`, () => {
    const token = localStorage.getItem("token") ?? "";
    return getPost({ id, token });
  });
  // useEffect(() => {
  //   const token = localStorage.getItem("token") ?? "";
  //   setToken(token);
  // }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error?.status === 404) {
    notFound();
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}

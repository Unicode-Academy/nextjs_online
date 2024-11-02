"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FilterForm() {
  const pathname = usePathname();
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const status = formData.get("status") as string;
    const keyword = formData.get("keyword") as string;
    const query = new URLSearchParams({ status, keyword }).toString();
    fetch(`/api/cookies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: "name", value: "hoanganunicode" }),
    });
    router.push(`${pathname}?${query}`);
  };
  useEffect(() => {
    const getTokenFromCookie = async () => {
      const res = await fetch(`/api/cookies?name=token`);
      const data = await res.json();
      console.log(data);
    };
    getTokenFromCookie();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <select name="status">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input type="search" name="keyword" placeholder="Keyword..." />
      <button>Search</button>
    </form>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import "./Pagination.css";

export default function Pagination({ maxPage }: { maxPage: number }) {
  const pageRange = Array.from({ length: maxPage }, (_, i) => i + 1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChangePage = (page: number) => {
    const query = Object.fromEntries(searchParams.entries());
    query.page = page.toString();
    router.push(`/users?${new URLSearchParams(query)}`);
  };
  const page = Number(searchParams.get("page") || 1);

  return (
    <>
      {pageRange.length > 1 &&
        pageRange.map((p) => (
          <button
            key={p}
            className={page === p ? "active" : ""}
            onClick={() => handleChangePage(p)}
          >
            {p}
          </button>
        ))}
    </>
  );
}

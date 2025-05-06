"use client";

import { useRouter, useSearchParams } from "next/navigation";
import "./Pagination.css";

export default function Pagination({ maxPage }: { maxPage: number }) {
  const pageRange = Array.from({ length: maxPage }, (_, i) => i + 1);
  const router = useRouter();
  const handleChangePage = (page: number) => {
    router.push(`/users?page=${page}`);
  };
  const searchParams = useSearchParams();
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

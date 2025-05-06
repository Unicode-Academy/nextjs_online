"use client";

import { debounce } from "@/utils/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Filter() {
  const router = useRouter();
  const [filter, setFilter] = useState({
    status: "",
    search: "",
  });
  const prevFilterRef = useRef({});

  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      !filter.search &&
      !filter.status &&
      !Object.keys(prevFilterRef.current).length
    )
      return;
    router.push(`/users?status=${filter.status}&search=${filter.search}`);
    return () => {
      prevFilterRef.current = { ...filter };
    };
  }, [filter]);

  return (
    <div>
      <select
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        defaultValue={searchParams.get("status") || ""}
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input
        type="search"
        placeholder="Search..."
        onChange={debounce(
          (e) => setFilter({ ...filter, search: e.target.value }),
          500
        )}
        defaultValue={searchParams.get("search") || ""}
      />
    </div>
  );
}

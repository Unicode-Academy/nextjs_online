"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { debounce } from "../../utils/debounce";

export default function SearchForm() {
  const [search, setSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";
  const router = useRouter();
  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);
  useEffect(() => {
    router.push(`/todos?search=${search}`);
  }, [search, router, searchFromUrl]);
  return (
    <div>
      <input
        type="search"
        placeholder="Search..."
        onChange={debounce((e) => setSearch(e.target.value), 500)}
        defaultValue={search}
      />
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { debounce } from "../../utils/debounce";

export default function SearchForm() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    if (search === "") {
      router.push("/todos");
    } else {
      router.push(`/todos?search=${search}`);
    }
  }, [search, router]);
  return (
    <div>
      <input
        type="search"
        placeholder="Search..."
        onChange={debounce((e) => setSearch(e.target.value), 500)}
      />
    </div>
  );
}

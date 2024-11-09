"use client";

import { debounce } from "@/app/utils/debounce";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleChangeInput = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(`/todos?search=${e.target.value}`);
    }
  );
  return (
    <input
      type="text"
      className="border-2 mt-2"
      placeholder="Search..."
      onChange={handleChangeInput}
      defaultValue={searchParams.get("search") ?? ""}
    />
  );
}

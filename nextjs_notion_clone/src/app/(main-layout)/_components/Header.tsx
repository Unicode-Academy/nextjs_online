"use client";
import { useScrollTop } from "@/app/hooks/useScrollTop";
import Logo from "./Logo";
import NavBar from "./NavBar";
import { cn } from "@/lib/utils";

export default function Header() {
  const scroll = useScrollTop();
  return (
    <div
      className={cn(
        "py-3 px-6 sm:flex sm:justify-between fixed top-0 w-full z-50",
        scroll &&
          "border-b border-gray-200 bg-white dark:bg-[#000] dark:border-gray-800 shadow-xs"
      )}
    >
      <Logo />
      <NavBar />
    </div>
  );
}

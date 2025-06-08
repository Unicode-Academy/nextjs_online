"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
  const locale = useLocale();
  const router = useRouter();

  const handleChange = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    router.refresh();
  };

  return (
    <div className="flex justify-between py-3">
      <span className="font-bold text-3xl">Unicode</span>

      <ul className="flex gap-3 items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <div className="flex gap-3">
        <button
          className={locale === "vi" ? "bg-black text-white" : ""}
          onClick={() => handleChange("vi")}
        >
          VI
        </button>
        <button
          className={locale === "en" ? "bg-black text-white" : ""}
          onClick={() => handleChange("en")}
        >
          EN
        </button>
      </div>
    </div>
  );
}

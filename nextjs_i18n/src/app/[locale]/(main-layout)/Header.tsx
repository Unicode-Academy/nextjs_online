"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <header className="flex justify-between">
      <h1 className="text-3xl">Unicode</h1>
      <div className="flex gap-3">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>
      <div className="flex gap-3">
        <Link
          className={locale === "vi" ? "underline" : ""}
          href={pathname}
          locale="vi"
        >
          VI
        </Link>
        <Link
          className={locale === "en" ? "underline" : ""}
          href={pathname}
          locale="en"
        >
          EN
        </Link>
      </div>
    </header>
  );
}

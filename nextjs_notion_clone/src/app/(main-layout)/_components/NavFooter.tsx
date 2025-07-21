import Link from "next/link";

export default function NavFooter() {
  return (
    <ul className="flex gap-3 items-center justify-center sm:justify-start mt-2 sm:mt-0">
      <li className="shrink-0">
        <Link href="#">Privacy Policy</Link>
      </li>
      <li className="shrink-0">
        <Link href="#">Terms & Conditions</Link>
      </li>
    </ul>
  );
}

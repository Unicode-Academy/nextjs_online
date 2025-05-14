import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Link href={`/dashboard`}>Dashboard</Link>
      <Link href={`/dashboard/settings`}>Settings</Link>
      <Link href={`/dashboard/setup`}>Setup</Link>
    </div>
  );
}

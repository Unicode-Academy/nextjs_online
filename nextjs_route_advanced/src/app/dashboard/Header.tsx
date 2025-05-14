import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/settings">Settings</Link>
    </div>
  );
}

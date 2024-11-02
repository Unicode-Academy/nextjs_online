"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Menu() {
  const pathname = usePathname();

  return (
    <>
      <h3>Menu</h3>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link
            href="/"
            className={clsx("nav-link", { active: pathname === "/" })}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/about"
            className={clsx("nav-link", { active: pathname === "/about" })}
            // prefetch={false}
          >
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/products"
            className={clsx("nav-link", { active: pathname === "/products" })}
          >
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/posts"
            className={clsx("nav-link", { active: pathname === "/posts" })}
          >
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/todos"
            className={clsx("nav-link", { active: pathname === "/todos" })}
          >
            Todos
          </Link>
        </li>
      </ul>
    </>
  );
}

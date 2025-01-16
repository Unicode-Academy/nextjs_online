"use client";
import { AppContext } from "./Provider";
import { use } from "react";
export default function Logo() {
  const context = use(AppContext);
  console.log(context);

  return <h1>Logo</h1>;
}

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Button() {
  const [clicked, setClicked] = useState(false);
  const search = useSearchParams();
  const handleClick = () => {
    setClicked(!clicked);
  };
  useEffect(() => {
    // localStorage.setItem("clicked", "true");
    const status = search.get("status");
    const keyword = search.get("keyword");
    console.log(status, keyword);
  }, []);
  return (
    <button onClick={handleClick}>Click me {clicked ? "(clicked)" : ""}</button>
  );
}

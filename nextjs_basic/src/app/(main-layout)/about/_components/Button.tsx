"use client";

import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  console.log(router);

  const handleNagive = () => {
    // router.push(`/products`);
    router.refresh();
  };
  return <button onClick={handleNagive}>Go Products</button>;
}

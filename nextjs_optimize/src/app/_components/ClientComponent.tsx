"use client";

export default function ClientComponent() {
  console.log(process.env.APP_NAME);

  return <h1 className="text-3xl font-bold">ClientComponent</h1>;
}

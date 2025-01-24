import Link from "next/link";

export default function Home() {
  console.log("home");
  return (
    <div>
      <h1>Home</h1>
      <Link href={`/demo-authorization`}>Go to</Link>
    </div>
  );
}

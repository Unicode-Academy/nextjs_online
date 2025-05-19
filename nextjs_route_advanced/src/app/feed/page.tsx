import Link from "next/link";

export default function FeedPage() {
  return (
    <div>
      <h1 className="text-3xl">Feed Page</h1>
      <Link href={`/photo/1`}>Photo 1</Link>
      <Link href={`/photo/2`}>Photo 2</Link>
    </div>
  );
}

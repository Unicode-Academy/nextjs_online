import Link from "next/link";
import photos from "@/app/data/photos.json";
export default function FeedPage() {
  return (
    <div>
      <h1 className="text-3xl">Feed Page</h1>
      <div className="flex justify-between">
        {photos.map((photo) => (
          <div key={photo.id} className="flex-grow border p-3">
            <h3 className="text-2xl">{photo.title}</h3>
            <p>{photo.description}</p>
            <Link
              href={`/photo/${photo.id}`}
              className="inline-block border bg-[green] text-white px-10 mt-3 rounded-full"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

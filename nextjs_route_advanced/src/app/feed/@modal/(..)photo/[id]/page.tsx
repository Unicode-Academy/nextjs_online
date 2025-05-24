import Modal from "@/app/_components/Modal";
import photos from "@/app/data/photos.json";
import { notFound } from "next/navigation";
export default async function PhotoFeed({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = photos.find((photo) => photo.id === Number(id));
  if (!photo) return notFound();
  return (
    <Modal>
      <div>
        <h1>{photo.title}</h1>
        <p>{photo.description}</p>
      </div>
    </Modal>
  );
}

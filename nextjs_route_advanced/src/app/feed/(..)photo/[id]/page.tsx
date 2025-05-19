export default async function PhotoFeed({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1>Photo Feed: {id}</h1>
    </div>
  );
}

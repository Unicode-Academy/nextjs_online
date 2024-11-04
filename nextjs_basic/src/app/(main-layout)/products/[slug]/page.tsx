type PageProps = {
  params: Promise<{ slug: string }>;
};
export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = slug.match(/[0-9]+$/i);
  const productId = result ? parseInt(result[0]) : null;
  return (
    <div>
      <h1>Chi tiết sản phẩm</h1>
      <h2>ID: {productId}</h2>
    </div>
  );
}

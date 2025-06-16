import { Metadata } from "next";
export type Props = {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { search } = await searchParams;

  return {
    title: search ? "Tìm kiếm: " + search : "Products",
  };
}
export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>
    </div>
  );
}

import FilterForm from "./_components/FilterForm";
import ProductList from "./_components/ProductList";
type SearchParam = {
  status: string;
  keyword: string;
};
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParam>;
}) {
  const search = await searchParams;
  return (
    <div>
      <h1>Products</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, veritatis
        expedita laborum, magnam, adipisci iste vel alias porro tempora esse
        facilis modi nemo harum possimus ad praesentium rerum doloremque
        officiis!
      </p>
      <p>Status: {search.status}</p>
      <p>Keyword: {search.keyword}</p>
      <FilterForm />
      <ProductList />
    </div>
  );
}

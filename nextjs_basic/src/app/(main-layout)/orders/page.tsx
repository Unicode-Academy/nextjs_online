import { redirect } from "next/navigation";

export default function OrdersPage() {
  const isLogin = false;
  if (!isLogin) {
    redirect(`/products`);
  }
  return (
    <div>
      <h1>Products</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit molestias
        ex dolorem reiciendis aperiam voluptatibus, corrupti dolorum quidem,
        mollitia repudiandae expedita voluptatum consectetur ducimus repellat ut
        asperiores obcaecati veniam deserunt.
      </p>
    </div>
  );
}

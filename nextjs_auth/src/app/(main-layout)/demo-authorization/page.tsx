import { FetchWrapper } from "@/app/utils/fetch-wrapper";
import Link from "next/link";
const fetchWrapper = new FetchWrapper(
  process.env.NEXT_PUBLIC_SERVER_AUTH_API as string
);
export default async function DemoAuthorization() {
  const response = await fetchWrapper.get<{
    name: string;
    email: string;
    role: string;
  }>("/auth/profile");

  const user = response.data;
  return (
    <div>
      <h1>Demo Authorization</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad similique
        quam temporibus. Incidunt natus sed fuga, aperiam repudiandae minus
        ratione officiis, hic, sint tenetur magni quia neque qui itaque culpa.
      </p>
      <h2>My Profile</h2>
      {user && (
        <ul>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
        </ul>
      )}
      <Link href={"/"}>Home</Link>
    </div>
  );
}

//api/my-course

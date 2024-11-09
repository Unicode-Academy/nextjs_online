import { cookies } from "next/headers";
// export const dynamic = "force-static";
const getSession = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value;
};
const getData = async () => {
  "use cache";
  return "something";
};
export default async function HomePage() {
  const session = await getSession();
  const data = await getData();
  return (
    <div>
      <h1>Home Page</h1>
      {session}
      {data}
    </div>
  );
}

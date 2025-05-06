import prisma from "@/lib/prisma";
import Link from "next/link";
import Pagination from "./_components/Pagination";
const LIMIT = 3;
export default async function Users({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const { page = 1 } = await searchParams;

  const skip = (page - 1) * LIMIT;

  const users = await prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
    take: LIMIT,
    skip,
  });

  const totalRows = await prisma.user.count();
  const maxPage = Math.ceil(totalRows / LIMIT);

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <h3 key={user.id}>
          {user.name} - {user.email}{" "}
          <Link href={`/users/edit/${user.id}`}>Edit</Link>{" "}
          <Link href={`/users/delete/${user.id}`}>Delete</Link>
        </h3>
      ))}
      <Pagination maxPage={maxPage} />
    </div>
  );
}

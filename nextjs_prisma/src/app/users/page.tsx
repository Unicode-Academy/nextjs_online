// import prisma from "@/lib/prisma";
import Link from "next/link";
import Pagination from "./_components/Pagination";
import Filter from "./_components/Filter";
import { Prisma } from "../generated/prisma";
// import { cache } from "react";
import { getListUser } from "@/utils/query";
const LIMIT = 3;
export default async function Users({
  searchParams,
}: {
  searchParams: Promise<{ page: number; status: string; search: string }>;
}) {
  const { page = 1, status = "", search = "" } = await searchParams;

  const skip = (page - 1) * LIMIT;
  const where: Prisma.UserWhereInput = {};

  if (status === "active" || status === "inactive") {
    where.status = status === "active" ? true : false;
  }
  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const { users, maxPage } = await getListUser(LIMIT, skip, where);

  return (
    <div>
      <h1>Users</h1>
      <Filter />
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

//Cache
/*
- Viết Route Handler --> Gọi qua Fetch (Fetch Cache)
- React Cache
- unstable_cache hoặc use cache
*/

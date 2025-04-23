import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Users() {
  const users = await prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
  });
  console.log(users);
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <h3 key={user.id}>
          {user.name} - {user.email}{" "}
          <Link href={`/users/edit/${user.id}`}>Edit</Link>
        </h3>
      ))}
    </div>
  );
}

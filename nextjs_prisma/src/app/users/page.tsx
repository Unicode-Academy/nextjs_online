import prisma from "@/lib/prisma";

export default async function Users() {
  const users = await prisma.users.findMany({
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
          {user.name} - {user.email}
        </h3>
      ))}
    </div>
  );
}

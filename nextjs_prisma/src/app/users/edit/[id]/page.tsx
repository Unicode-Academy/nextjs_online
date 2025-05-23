// import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Form from "./Form";
import { getUser } from "@/utils/query";
export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const user = await getUser(id);
  if (!user) {
    return notFound();
  }

  return (
    <div>
      <h1>Edit A User</h1>
      <Form user={user} />
    </div>
  );
}

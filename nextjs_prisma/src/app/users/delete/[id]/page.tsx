import prisma from "@/lib/prisma";
import ActionBtn from "./ActionBtn";
import { notFound } from "next/navigation";

export default async function DeleteUserPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
  if (!user) {
    return notFound();
  }
  return (
    <div>
      <h2>Are you sure?</h2>
      <ActionBtn id={id} />
    </div>
  );
}

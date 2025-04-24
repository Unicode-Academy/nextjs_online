"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
export const deleteUser = async (id: number) => {
  await prisma.user.delete({ where: { id: +id } });
  return redirect(`/users`);
};

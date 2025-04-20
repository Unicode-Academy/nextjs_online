"use server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/hashing";
import { redirect } from "next/navigation";
export const createUser = async (
  prevState: { message: string },
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const status = formData.get("status") as string;
  if (!name || !email || !password || !status) {
    return {
      message: "Please fill out all fields",
    };
  }
  //Truy vấn tới database để kiểm tra email có tồn tại không
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userExist) {
    return {
      message: "Email already exists",
    };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword(password),
      status: status === "active",
    },
  });
  redirect("/users");
};

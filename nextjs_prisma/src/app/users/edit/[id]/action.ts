"use server";
import { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/hashing";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
export const updateUser = async (
  prevState: { message: string },
  formData: FormData,
  id: number | null
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const status = formData.get("status") as string;
  if (!name || !email || !status || !id) {
    return {
      message: "Please fill out all fields",
    };
  }

  //Truy vấn tới database để kiểm tra email có tồn tại không
  const userExist = await prisma.user.findFirst({
    where: {
      email,
      id: {
        not: id,
      },
    },
  });
  if (userExist) {
    return {
      message: "Email already exists",
    };
  }

  const dataUpdate: Prisma.UserUpdateInput = {
    name,
    email,
    status: status === "active",
  };
  //Nếu password tồn tại --> Thực hiện hash password
  if (password) {
    dataUpdate.password = hashPassword(password);
  }

  await prisma.user.update({
    data: dataUpdate,
    where: { id },
  });
  revalidateTag("user-list");
  revalidateTag(`user-${id}`);
  redirect("/users");
};

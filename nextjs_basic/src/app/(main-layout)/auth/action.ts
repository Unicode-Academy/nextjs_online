"use server";
import { z } from "zod";
export const handleRegister = async (
  prevState: {
    message: string;
    success: boolean;
  },
  formData: FormData
) => {
  const schema = z.object({
    name: z.string().min(3, "Tên phải từ 3 ký tự"),
    email: z
      .string()
      .min(1, "Email bắt buộc phải nhập")
      .email("Email không đúng định dạng"),
    password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
  });
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
      message: "Register unsuccessfully",
    };
  }
  return {
    success: true,
    message: "Register successfully",
  };
};

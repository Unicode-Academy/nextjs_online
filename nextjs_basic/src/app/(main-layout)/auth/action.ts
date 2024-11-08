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
    confirm_password: z
      .string()
      .min(1, "Vui lòng xác nhận mật khẩu")
      .refine((value) => {
        return value === formData.get("password");
      }, "Hai mật khẩu không khớp"),
  });
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  });
  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
      message: "Register unsuccessfully",
    };
  }
  const response = await fetch(`https://api.escuelajs.co/api/v1/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: "https://picsum.photos/800",
    }),
  });
  if (response.ok) {
    return {
      success: true,
      message: "Register successfully",
    };
  }
  return {
    success: false,
    message: "Register unsuccessfully",
  };
};

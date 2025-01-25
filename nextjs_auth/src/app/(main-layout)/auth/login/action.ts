"use server";
import { FormState } from "./Form";
import { saveToken } from "@/app/utils/auth";
const getProfile = async (accessToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_AUTH_API}/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.json();
};
export const handleLogin = async (prevState: FormState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_AUTH_API}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  if (!response.ok) {
    return {
      success: false,
      message: "Login failed",
    };
  }
  const data = await response.json();
  const accessToken = data.access_token;
  const profile = await getProfile(accessToken);
  await saveToken(data.access_token, data.refresh_token);
  return {
    success: true,
    message: "Login successful",
    data: { ...data, user: profile },
  };
};

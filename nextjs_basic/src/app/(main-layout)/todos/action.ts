"use server";

import { redirect } from "next/navigation";

export const create = async (formData: FormData) => {
  const title = formData.get("title");
  const content = formData.get("content");
  console.log(title, content);
  redirect(`/`);
};

import { getUser } from "@/app/utils/auth";
import Form from "./Form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    const role = user.role;
    if (role === "admin") {
      return redirect("/admin");
    }
    return redirect("/");
  }
  return (
    <div className="w-50 mx-auto">
      <h1>Đăng nhập</h1>
      <Form />
    </div>
  );
}

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
export default function CreateUserPage() {
  const createUser = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const status = (formData.get("status") === "active") as boolean;
    if (!name || !email || !password) return;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        status,
      },
    });
    if (user) {
      redirect("/users");
    }
  };
  return (
    <div>
      <h1>Create A User</h1>
      <form action={createUser}>
        <div>
          <label>Name</label>
          <input type="text" name="name" placeholder="Name..." required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" placeholder="Email..." required />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password..."
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select name="status" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}

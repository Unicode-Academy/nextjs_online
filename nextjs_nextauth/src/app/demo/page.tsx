import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Login from "../_components/Login";

export default async function DemoPage() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>Chào bạn: {session?.user?.name}</h1>
      <Login />
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DemoPage() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <h1>Chào bạn: {session?.user?.name}</h1>
    </div>
  );
}

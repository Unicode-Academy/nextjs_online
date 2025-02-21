import { getServerSession } from "next-auth";

export default async function DemoPage() {
  const session = await getServerSession();
  return (
    <div>
      <h1>Chào bạn: {session?.user?.name}</h1>
    </div>
  );
}

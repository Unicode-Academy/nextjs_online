import { delay } from "../utils/utils";

export default async function DashboardPage() {
  await delay(2000);
  return (
    <div>
      <h1 className="text-3xl">Dashboard</h1>
    </div>
  );
}

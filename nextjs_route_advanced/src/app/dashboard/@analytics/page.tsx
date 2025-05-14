import { delay } from "@/app/utils/utils";

export default async function AnalyticsPage() {
  await delay(2000);
  console.log(`Analytics Render`);
  return (
    <div>
      <h1 className="text-3xl">Analytics</h1>
    </div>
  );
}

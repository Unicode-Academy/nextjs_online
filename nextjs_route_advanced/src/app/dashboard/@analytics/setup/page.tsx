import { delay } from "@/app/utils/utils";

export default async function AnalyticsSettings() {
  await delay(2000);
  console.log(`Analytics Settings Render`);
  return <div className="text-2xl">Analytics Settings</div>;
}

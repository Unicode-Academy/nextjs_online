import { delay } from "@/app/utils/utils";

export default async function AnalyticsSettings() {
  await delay(2000);
  return <div className="text-2xl">Analytics Settings</div>;
}

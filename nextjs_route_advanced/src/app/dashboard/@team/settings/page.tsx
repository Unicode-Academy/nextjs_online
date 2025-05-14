import { delay } from "@/app/utils/utils";

export default async function TeamSettings() {
  await delay(2000);
  console.log(`Team Settings Render`);
  return <div className="text-2xl">Team Settings</div>;
}

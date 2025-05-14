import { delay } from "@/app/utils/utils";

export default async function TeamPage() {
  await delay(2000);
  // throw new Error("Team Error");
  return (
    <div>
      <h1 className="text-3xl">Team</h1>
    </div>
  );
}

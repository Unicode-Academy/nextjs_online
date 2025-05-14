import Header from "./Header";

export default function DashboardLayout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <div className="w-[1200px] mx-auto">
      <main className="mb-3">
        <Header />
        {children}
      </main>
      <div className="flex gap-3">
        <section className="w-1/2 border h-[500px]">{team}</section>
        <section className="w-1/2 border h-[500px]">{analytics}</section>
      </div>
    </div>
  );
}

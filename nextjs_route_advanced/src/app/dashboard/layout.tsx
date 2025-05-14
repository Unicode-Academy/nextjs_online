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
    <div>
      <Header />
      <main>{children}</main>
      <section>{team}</section>
      <section>{analytics}</section>
    </div>
  );
}

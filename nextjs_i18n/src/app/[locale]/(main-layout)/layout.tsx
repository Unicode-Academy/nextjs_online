import Header from "./Header";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[1200px] mx-auto py-5">
      <Header />
      {children}
    </div>
  );
}

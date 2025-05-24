import { Link } from "@/i18n/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <h1 className="text-3xl">Unicode</h1>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </header>
      {children}
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-[800px] mx-auto">{children}</div>;
}

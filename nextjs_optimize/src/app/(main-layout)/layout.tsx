import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main Layout",
  description: "Main layout description",
};
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

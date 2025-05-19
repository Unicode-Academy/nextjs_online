export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="feed-layout border bg-[grey]">{children}</div>;
}

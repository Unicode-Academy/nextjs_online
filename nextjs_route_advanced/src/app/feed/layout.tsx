export default function FeedLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="w-[1200px] mx-auto py-10">{children}</div>
      {modal}
    </>
  );
}

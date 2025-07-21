import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

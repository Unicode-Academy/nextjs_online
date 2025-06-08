import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import Nav from "./_components/Nav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <div className="w-[1200px] mx-auto">
          <NextIntlClientProvider>
            <Nav />
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}

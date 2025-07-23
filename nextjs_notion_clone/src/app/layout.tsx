import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/ThemeProvider";
import { ConvexClientProvider } from "./_components/ConvexClientProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "jotion",
  description: "The connected workspace where better, faster work happens.",
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: "/logo-dark.svg",
      href: "/logo-dark.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

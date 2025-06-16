import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Unicode - Học lập trình web bài bản",
  description: "Unicode chia sẻ kiến thức NextJS",
  keywords: "php, js",
  openGraph: {
    title: "Unicode Academy",
    description: "Reactjs Tutorial",
    type: "website",
    images: [
      "https://unicode.vn/image/1.jpg",
      "https://unicode.vn/image/2.jpg",
    ],
  },
  icons: {
    icon: "https://github.com/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}

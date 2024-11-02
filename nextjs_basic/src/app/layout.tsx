import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // console.log("Root layout");

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

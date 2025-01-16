import React from "react";
import Header from "./_components/Header";
import Provider from "./_components/Provider";
export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container">
      <Provider>
        <Header />
        {children}
      </Provider>
    </div>
  );
}

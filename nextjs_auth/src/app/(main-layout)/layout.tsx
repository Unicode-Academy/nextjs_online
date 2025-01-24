import React from "react";
// import Header from "./_components/Header";
import Provider from "./_components/Provider";
import Header2 from "./_components/Header2";
export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container">
      <Provider>
        {/* <Header /> */}
        <Header2 />
        {children}
      </Provider>
    </div>
  );
}

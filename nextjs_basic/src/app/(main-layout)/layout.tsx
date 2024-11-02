import React from "react";
import Menu from "./_components/Menu";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // console.log("Main layout");
  return (
    <div className="container main-layout py-3">
      <div className="row">
        <div className="col-3">
          <Menu />
        </div>
        <div className="col-9">{children}</div>
      </div>
    </div>
  );
}

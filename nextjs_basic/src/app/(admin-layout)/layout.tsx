import React from "react";

export default function AdminLayouts({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="admin-layout container py-3">
      <h2>Admin Panel</h2>
      {children}
    </div>
  );
}

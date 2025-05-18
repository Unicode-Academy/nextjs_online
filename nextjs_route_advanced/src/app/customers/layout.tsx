import { getRole } from "../utils/utils";

export default function CustomerLayout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const role = getRole();
  return (
    <div className="customer-layout">{role === "admin" ? admin : user}</div>
  );
}

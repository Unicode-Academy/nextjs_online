import Logo from "./Logo";
import NavFooter from "./NavFooter";

export default function Footer() {
  return (
    <div className="py-3 px-6 sm:flex sm:justify-between">
      <Logo />
      <NavFooter />
    </div>
  );
}

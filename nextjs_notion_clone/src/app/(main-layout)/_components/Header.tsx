import Logo from "./Logo";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <div className="py-3 px-6 sm:flex sm:justify-between">
      <Logo />
      <NavBar />
    </div>
  );
}

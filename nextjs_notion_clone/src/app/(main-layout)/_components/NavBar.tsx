import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sun } from "lucide-react";

export default function NavBar() {
  return (
    <div className="flex gap-3 items-center justify-center mt-3 sm:mt-0">
      <Link href={"#"}>Login</Link>
      <Button className="rounded-[5px]">Get Jotion Free</Button>
      <Button variant="outline" size="icon">
        <Sun />
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export default function HomePage() {
  return (
    <div className="flex flex-col justify-center min-h-full px-3">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
          Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
          <span className="underline">Jotion</span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl my-3">
          Jotion is the connected workspace where <br /> better, faster work
          happens.
        </p>
        <Button size={null} className="rounded-[5px] py-3 px-5">
          Enter Jotion <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

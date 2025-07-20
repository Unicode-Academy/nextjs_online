import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="w-[1200px] mx-auto">
      <h1 className="text-5xl font-bold">Notion Demo</h1>
      <Button
        variant={"default"}
        className="bg-[blueviolet] px-10 my-3 hover:bg-[green] cursor-pointer"
      >
        Click me
      </Button>
    </div>
  );
}

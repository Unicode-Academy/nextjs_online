import { Search } from "lucide-react";
export default function Trashbox() {
  return (
    <div className="text-sm">
      <div className="flex gap-1 items-center p-2">
        <Search size={18} />
        <input
          type="search"
          placeholder="Filter by page title"
          className="flex w-full rounded-md border border-input py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
      </div>
    </div>
  );
}

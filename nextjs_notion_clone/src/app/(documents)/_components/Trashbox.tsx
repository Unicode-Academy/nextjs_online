import { useMutation, useQuery } from "convex/react";
import { Undo, Trash, Search } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
export default function Trashbox() {
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const handleRestore = (id: Id<"documents">) => {
    const promise = restore({ id });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored successfully",
      error: "Failed to restore note",
    });
  };
  const handleRemove = (id: Id<"documents">) => {
    const promise = remove({ id });
    toast.promise(promise, {
      loading: "Removing note...",
      success: "Note removed successfully",
      error: "Failed to remove note",
    });
  };
  if (!documents) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }
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
        <p className="hidden text-xs text-center text-muted-foreground pb-2 last:block">
          No documents found.
        </p>
        {documents?.map((document) => (
          <div
            key={document._id}
            className="text-sm rounded-sm w-full flex items-center text-primary justify-between hover:bg-primary/5 cursor-pointer"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  handleRestore(document._id);
                }}
                className="rounded-sm p-2 hover:bg-neutral-200 cursor-pointer dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <div
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  handleRemove(document._id);
                }}
                className="rounded-sm p-2 hover:bg-neutral-200 cursor-pointer"
              >
                <Trash className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

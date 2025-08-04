import { ChevronDown, LucideIcon, Plus, Trash } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { ChevronRight } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useUser } from "@clerk/nextjs";
interface ItemProps {
  id?: Id<"documents">;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isSearch?: boolean;
  expanded?: boolean;
  onExpand?: () => void;
  level?: number;
}

export default function Item({
  label,
  icon: Icon,
  onClick,
  isSearch,
  id,
  expanded,
  onExpand,
  level = 0,
}: ItemProps) {
  const mutateDocument = useMutation(api.documents.create);
  const ArrowIcon = expanded ? ChevronDown : ChevronRight;
  const router = useRouter();
  const { user } = useUser();
  const archiveDocument = useMutation(api.documents.archive);
  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExpand?.();
  };
  const handleCreate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) {
      return;
    }
    const promise = mutateDocument({
      title: "Untitled",
      parentDocument: id,
    });
    toast.promise(promise, {
      loading: "Creating a note...",
      success: "Note created successfully",
      error: "Failed to create note",
    });
    if (!expanded) {
      onExpand?.();
    }
    router.push(`/documents/${id}`);
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) {
      return;
    }
    const promise = archiveDocument({ id }).then(() => {
      router.push(`/documents`);
    });
    toast.promise(promise, {
      loading: "Moving note...",
      success: "Note moving to trash successfully",
      error: "Failed to moving note",
    });
  };

  if (id) {
    console.log(`level ${level}`);
  }

  return (
    <div
      onClick={onClick}
      className="group/item flex gap-1 items-center py-1 text-muted-foreground pr-3 cursor-pointer text-sm hover:bg-primary/5 font-medium"
      style={{ paddingLeft: `${level > 0 ? level * 16 + 16 : 16}px` }}
    >
      {id && (
        <div className="hover:bg-[#ccc] rounded-[5px]">
          <ArrowIcon size={16} onClick={handleExpand} />
        </div>
      )}
      <Icon size={18} />
      <span className="truncate">{label}</span>
      {id && (
        <div className="ml-auto flex items-center hover:bg-neutral-300 rounded-[3px] opacity-0 group-hover/item:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="cursor-pointer" size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" forceMount>
              <DropdownMenuItem className="p-3 text-xs" onClick={handleArchive}>
                <Trash size={14} />
                Delete
              </DropdownMenuItem>
              <p className="text-xs text-gray-600 border-t py-2 px-2">
                Last edited by: {user?.fullName}
              </p>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {id && (
        <div className="hover:bg-[#ccc] rounded-[5px]">
          <Plus size={16} onClick={handleCreate} />
        </div>
      )}
      {isSearch && (
        <kbd className="ml-auto bg-secondary border-1 rounded-[5px] px-[5px] py-[1px] text-xs inline-flex gap-1 items-center">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      )}
    </div>
  );
}

Item.Skeleton = function SkeletonLoading() {
  return (
    <div className="flex gap-1 px-3">
      <Skeleton className="h-[15px] w-[10px] rounded-[5px] bg-gray-200" />
      <Skeleton className="h-[15px] w-[30%] rounded-[5px] bg-gray-200" />
    </div>
  );
};

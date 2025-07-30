import { ChevronDown, LucideIcon, Plus } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { ChevronRight } from "lucide-react";
interface ItemProps {
  id?: Id<"documents">;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isSearch?: boolean;
  expanded?: boolean;
  onExpand?: () => void;
}

export default function Item({
  label,
  icon: Icon,
  onClick,
  isSearch,
  id,
  expanded,
  onExpand,
}: ItemProps) {
  const ArrowIcon = expanded ? ChevronDown : ChevronRight;
  if (id) {
    console.log(expanded);
  }

  return (
    <div
      onClick={onClick}
      className="flex gap-1 items-center py-1 text-muted-foreground px-3 cursor-pointer text-sm hover:bg-primary/5 my-1 font-medium"
    >
      {id && (
        <div className="hover:bg-[#ccc] rounded-[5px]">
          <ArrowIcon size={16} onClick={onExpand} />
        </div>
      )}
      <Icon size={18} />
      {label}
      {id && (
        <div className="hover:bg-[#ccc] rounded-[5px] ml-auto">
          <Plus size={16} />
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

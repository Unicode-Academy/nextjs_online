import { LucideIcon } from "lucide-react";

interface ItemProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isSearch?: boolean;
}

export default function Item({
  label,
  icon: Icon,
  onClick,
  isSearch,
}: ItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex gap-2 items-center py-1 text-muted-foreground px-3 cursor-pointer text-sm hover:bg-primary/5 my-1 font-medium"
    >
      <Icon size={18} />
      {label}
      {isSearch && (
        <kbd className="ml-auto bg-secondary border-1 rounded-[5px] px-[5px] py-[1px] text-xs inline-flex gap-1 items-center">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      )}
    </div>
  );
}

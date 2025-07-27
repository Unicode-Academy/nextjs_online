import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { AvatarImage } from "@radix-ui/react-avatar";
export default function UserItem() {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <div className="cursor-pointer hover:bg-[#ddd] p-2">
        <DropdownMenuTrigger className="flex gap-2 items-center cursor-pointer">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <span className="line-clamp-1 me-3 text-left text-sm font-medium">
            {user?.fullName}
          </span>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

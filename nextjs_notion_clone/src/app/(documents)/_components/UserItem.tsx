import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ChevronsUpDown } from "lucide-react";
export default function UserItem() {
  const { user } = useUser();
  //   console.log(user);

  return (
    <DropdownMenu>
      <div className="cursor-pointer hover:bg-[#ddd] p-2">
        <DropdownMenuTrigger className="text-left flex gap-2 items-center cursor-pointer outline-0 block w-full">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <span className="line-clamp-1 me-3 text-left text-sm font-medium">
            {user?.fullName}
          </span>
          <ChevronsUpDown size={15} className="text-muted-foreground" />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="w-[300px]">
          <p className="text-[13px] text-muted-foreground mb-3">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="line-clamp-1 me-3 text-left">
              {user?.fullName}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-transparent">
          <SignOutButton>
            <span className="cursor-pointer text-muted-foreground">Logout</span>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

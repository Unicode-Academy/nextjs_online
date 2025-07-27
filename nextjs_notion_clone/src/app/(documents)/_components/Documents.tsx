"use client";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function Documents() {
  const { isLoading } = useConvexAuth();
  const { user } = useUser();
  if (isLoading) {
    return (
      <div className="h-full flex w-full justify-center items-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }
  return (
    <div className="h-full flex w-full items-center justify-center flex-col">
      <div>
        <Image
          className="dark:hidden"
          src={`/empty.png`}
          width={300}
          height={300}
          alt="Empty"
        />
        <Image
          className="hidden dark:block"
          src={`/empty-dark.png`}
          width={300}
          height={300}
          alt="Empty"
        />
      </div>
      <h2 className="text-lg font-medium mb-3">
        Welcome to {user?.fullName}&apos;s Jotion
      </h2>
      <Button className="rounded-[5px] cursor-pointer">
        <CirclePlus />
        Create a note
      </Button>
    </div>
  );
}

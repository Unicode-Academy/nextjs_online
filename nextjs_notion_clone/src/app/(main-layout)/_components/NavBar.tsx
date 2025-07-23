"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import LoadingSpinner from "@/app/_components/LoadingSpinner";

export default function NavBar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  return (
    <div className="flex gap-3 items-center justify-center mt-3 sm:mt-0">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!isAuthenticated ? (
            <SignInButton mode="modal">
              <div className="flex gap-3 items-center">
                <Button
                  className="cursor-pointer rounded-[5px]"
                  variant={"outline"}
                >
                  Login
                </Button>
                <Button className="rounded-[5px] cursor-pointer">
                  Get Jotion Free
                </Button>
              </div>
            </SignInButton>
          ) : (
            <>
              <span>Hi, {user?.fullName}</span>
              <Button
                className="cursor-pointer rounded-[5px]"
                asChild
                variant={"outline"}
              >
                <Link href="/documents">Enter Jotion</Link>
              </Button>
              <UserButton />
            </>
          )}
        </>
      )}
      <ModeToggle />
    </div>
  );
}

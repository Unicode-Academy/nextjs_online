"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <p className="text-base sm:text-xl md:text-2xl my-3">
        Jotion is the connected workspace where <br /> better, faster work
        happens.
      </p>
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : isAuthenticated ? (
        <Button
          size={null}
          className="rounded-[5px] py-3 px-5 cursor-pointer"
          asChild
        >
          <Link href={`/documents`}>
            Enter Jotion <ArrowRight />
          </Link>
        </Button>
      ) : (
        <SignInButton mode="modal">
          <Button
            size={null}
            className="rounded-[5px] py-3 px-5 cursor-pointer"
          >
            Get Jotion Free <ArrowRight />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

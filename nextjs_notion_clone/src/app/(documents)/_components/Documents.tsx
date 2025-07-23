"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useConvexAuth } from "convex/react";

export default function Documents() {
  const { isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="h-full flex w-full justify-center items-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }
  return (
    <div className="h-full flex w-full py-20">
      <h1 className="text-3xl">Documents</h1>
    </div>
  );
}

import {
  clerkMiddleware,
  ClerkMiddlewareOptions,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextFetchEvent, NextRequest } from "next/server";
const isProtectedRoute = createRouteMatcher(["/documents(.*)"]);
const clerkHandler = async (
  auth: { protect: () => Promise<void> },
  req: NextRequest
) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  console.log("Middleware sau auth");
};

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  console.log("Middle trước auth");

  return clerkMiddleware(clerkHandler as ClerkMiddlewareOptions)(
    request,
    event
  );
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
const i18nMiddleware = createMiddleware(routing);
const isAuth = false;
export default async function middleware(request: NextRequest) {
  const response = i18nMiddleware(request);
  console.log(response.ok);

  if (response && !response.ok) {
    return response;
  }
  //Logic
  const pathname = "/" + request.nextUrl.pathname.split("/")[2];
  if (pathname.startsWith("/orders") && !isAuth) {
    //Check authentication
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

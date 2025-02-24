import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  (request) => {
    const response = NextResponse.next();
    response.cookies.set("name", "ahihi");
    return response;
  },
  {
    //   pages: {
    //     signIn: "/login",
    //     error: "/error",
    //   },

    callbacks: {
      authorized: ({ token }) => {
        if (token?.email?.includes("@unicode.vn")) {
          return true;
        }
        return false;
      },
    },
  }
);
export const config = { matcher: ["/protected/:path*"] };

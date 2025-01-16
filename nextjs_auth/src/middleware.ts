import { NextRequest, NextResponse } from "next/server";
import {
  getRefreshToken,
  getToken,
  getUser,
  makeRefreshToken,
} from "./app/utils/auth";
export const middleware = async (request: NextRequest) => {
  // const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  //Kiểm tra
  const accessToken = await getToken();
  const refreshToken = await getRefreshToken();
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  //Gọi lên server api để verify token ==> Yêu cầu back-end xây dựng
  const user = await getUser();
  if (!user) {
    //Gọi refresh token
    const newToken = await makeRefreshToken(refreshToken!);
    if (newToken) {
      const response = NextResponse.next();
      //Lưu token mới vào cookie
      response.cookies.set("token", newToken.access_token, {
        httpOnly: true,
        path: "/",
        maxAge: 86400,
      });
      response.cookies.set("refresh_token", newToken.refresh_token, {
        httpOnly: true,
        path: "/",
        maxAge: 86400 * 7,
      });
      return response;
    }

    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    response.cookies.delete("refresh_token");
    return response;
  }
  const role = user.role;

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }
};

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*"],
};

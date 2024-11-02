import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/gioi-thieu")) {
    return NextResponse.rewrite(new URL("/about", request.url));
  }
  if (pathname.startsWith("/san-pham")) {
    const productUrl = request.url;
    const result = productUrl.match(/[0-9]+$/i);
    if (result) {
      const productId = result[0];
      return NextResponse.rewrite(
        new URL(`/products/${productId}`, request.url)
      );
    }
    return NextResponse.rewrite(new URL("/products", request.url));
  }
};

export const config = {
  //   matcher: ["/admin/:path*", "/orders/:path*"],
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};

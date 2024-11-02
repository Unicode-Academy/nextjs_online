import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const cookieName = request.nextUrl.searchParams.get("name") as string;
  const value = (await cookies()).get(cookieName)?.value;
  return NextResponse.json({ value });
};

export const POST = async (request: NextRequest) => {
  const { key, value } = await request.json();
  (await cookies()).set(key, value, {
    httpOnly: true,
    path: "/",
    maxAge: 3600,
  });
  return NextResponse.json({ success: true });
};

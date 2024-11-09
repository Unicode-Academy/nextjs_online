import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { tag } = await request.json();
  revalidateTag(tag);
  return NextResponse.json({
    success: true,
  });
};

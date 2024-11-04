import { NextRequest, NextResponse } from "next/server";
type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};
export const GET = async (request: NextRequest, { params }: ParamsType) => {
  const { id } = await params;
  return NextResponse.json({
    success: true,
    data: {
      id: +id,
      name: "Hoàng An",
      email: "hoangan.web@gmail.com",
    },
  });
};

//GET ==> HTTP METHOD GET
//POST ==> HTTP METHOD POST
//PUT ==> HTTP METHOD PUT
//PATCH ==> HTTP METHOD PATCH
//DELETE ==> HTTP METHOD DELETE
import { NextRequest, NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { cookies } from "next/headers";
export const GET = async (request: NextRequest) => {
  const keyword = request.nextUrl.searchParams.get("keyword");
  // const token = request.headers.get("token");
  // const token = (await headers()).get("token");
  // const name = (await cookies()).get("name")?.value;
  // (await cookies()).set("email", "hoangan.web@gmail.com", {
  //   path: "/",
  //   maxAge: 3600,
  //   httpOnly: true,
  // });
  // (await cookies()).delete("name");

  return NextResponse.json({
    success: true,
    message: "Hello World",
    data: {
      keyword,
      // name,
    },
  });
};

export const POST = async (request: NextRequest) => {
  // const bodyText = await request.text();
  // const body = Object.fromEntries(new URLSearchParams(bodyText).entries());
  // console.log(body);
  // const body = await request.json();
  console.log(request);

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  // const image = formData.get("image");
  // console.log(image);

  return NextResponse.json(
    {
      success: true,
      message: "Created successfully",
      data: {
        name,
        email,
      },
    },
    {
      status: 201,
    }
  );
};

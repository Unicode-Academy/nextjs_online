// import { cookies } from "next/headers";
import { cache } from "react";
let refreshTokenPromise: Promise<{
  access_token: string;
  refresh_token: string;
}> | null = null;
export const makeRefreshToken = async (
  refreshToken: string
): Promise<{ access_token: string; refresh_token: string }> => {
  const requestRefreshToken = async () => {
    console.log("refresh token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_AUTH_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );
    if (!response.ok) {
      return false;
    }
    return response.json();
  };
  if (!refreshTokenPromise) {
    refreshTokenPromise = requestRefreshToken();
  }
  return refreshTokenPromise;
};
export const getUser = cache(async () => {
  const accessToken = await getToken();
  // const refreshToken = cookieStore.get("refresh_token")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_AUTH_API}/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    //Gọi api refresh token để lấy token mới
    // const newToken = await makeRefreshToken(refreshToken!);

    //Lưu token mới vào cookie
    // await fetch(`http://localhost:3000/api/cookie?key=token`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ value: newToken.access_token, maxAge: 86400 }),
    // });

    return false;
  }
  return response.json();
});

export const getToken = async () => {
  let data = null;
  if (isClient()) {
    const response = await fetch(`/api/cookie?key=token`);
    if (!response.ok) {
      return false;
    }
    data = await response.json();
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    data = cookieStore.get("token");
  }

  return data?.value;
};

export const isClient = () => {
  return typeof window !== "undefined";
};

export const getRefreshToken = async () => {
  let data = null;
  if (isClient()) {
    const response = await fetch(`/api/cookie?key=refresh_token`);
    if (!response.ok) {
      return false;
    }
    data = await response.json();
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    data = cookieStore.get("refresh_token");
  }

  return data?.value;
};

export const deleteToken = async () => {
  await fetch(`/api/cookie?key=token`, {
    method: "DELETE",
  });
  await fetch(`/api/cookie?key=refresh_token`, {
    method: "DELETE",
  });
};

export const saveToken = async (accessToken: string, refreshToken?: string) => {
  if (!isClient()) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.set("token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE as unknown as number,
    });
    if (refreshToken) {
      cookieStore.set("refresh_token", refreshToken, {
        httpOnly: true,
        path: "/",
        maxAge: process.env
          .NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE as unknown as number,
      });
    }
  } else {
    await fetch(`/api/cookie?key=token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: accessToken,
        maxAge: process.env
          .NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE as unknown as number,
      }),
    });
    if (refreshToken) {
      await fetch(`/api/cookie?key=refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: accessToken,
          maxAge: process.env
            .NEXT_PUBLIC_REFRESH_TOKEN_EXPIRE as unknown as number,
        }),
      });
    }
  }
};

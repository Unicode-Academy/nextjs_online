export const refreshToken = async (refreshToken: string) => {
  try {
    // refreshToken += "1";
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );
    if (!response.ok) {
      throw new Error("Refresh Token invalid");
    }
    return response.json();
  } catch {
    return false;
  }
};

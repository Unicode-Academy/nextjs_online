export const revalidateTag = (tag: string) => {
  fetch(`/api/cache`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tag }),
  });
};

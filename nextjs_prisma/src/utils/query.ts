// import { cache } from "react";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
// import { unstable_cache } from "next/cache";
export const getListUser = async (
  limit: number,
  skip: number,
  where: Prisma.UserWhereInput
) => {
  "use cache";
  cacheTag("user-list");
  const users = await prisma.user.findMany({
    orderBy: {
      id: "desc",
    },
    take: limit,
    skip,
    where,
  });

  const totalRows = await prisma.user.count({
    where,
  });
  const maxPage = Math.ceil(totalRows / limit);
  return { users, maxPage };
};

export const getUser = async (id: number) => {
  "use cache";
  cacheTag(`user-${id}`); //user-1, user-2
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
  console.log("getUser", id);

  return user;
};

// import { cache } from "react";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma";
// import { unstable_cache } from "next/cache";
export const getListUser = async (
  limit: number,
  skip: number,
  where: Prisma.UserWhereInput
) => {
  "use cache";
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

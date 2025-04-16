import { PrismaClient, Prisma } from "../src/app/generated/prisma";
const prisma = new PrismaClient();
const userData: Prisma.UserCreateInput[] = [
  {
    name: "User 1",
    email: "user1@gmail.com",
    password: "123456",
    status: true,
  },
  {
    name: "User 2",
    email: "user2@gmail.com",
    password: "123456",
    status: true,
  },
  {
    name: "User 3",
    email: "user3@gmail.com",
    password: "123456",
    status: false,
  },
];

async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}
main();

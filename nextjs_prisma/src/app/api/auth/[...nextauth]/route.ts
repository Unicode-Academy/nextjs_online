import NextAuth, { DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/utils/hashing";
declare module "next-auth" {
  interface User extends DefaultUser {
    id: number;
  }
}
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (user) {
          if (comparePassword(password, user.password as string)) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };

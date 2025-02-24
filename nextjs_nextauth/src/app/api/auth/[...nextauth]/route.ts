import NextAuth, { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    // async session({
    //   session,
    //   token,
    // }: {
    //   session: Session & { sub?: string };
    //   token: JWT;
    // }) {
    //   session.sub = token.sub;
    //   return session;
    // },
    redirect({ url, baseUrl }) {
      // console.log(`url: ${url}`);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    // signIn({ user }) {
    //   if (!user.email) return false;
    //   return (user.email as string).includes("@unicode.vn");
    // },
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session & { accessToken?: string };
      token: JWT;
    }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

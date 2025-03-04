import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Email và mật khẩu",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "Địa chỉ email...",
        },
        password: {
          label: "Mật khẩu",
          type: "password",
          placeholder: "Mật khẩu...",
        },
      },
      async authorize(credentials) {
        console.log(credentials);

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const token = await res.json();

        // // If no error and we have user data, return it
        if (res.ok && token) {
          //Lấy thông tin user
          const res = await fetch(
            `https://api.escuelajs.co/api/v1/auth/profile`,
            {
              headers: {
                Authorization: `Bearer ${token.access_token}`,
              },
            }
          );
          const user = await res.json();
          user.access_token = token.access_token;
          return user;
        }
        // // Return null if user data could not be retrieved
        return null;
      },
    }),
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
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // console.log(token, account);

      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.accessToken = (
          user as User & { access_token?: string }
        ).access_token;
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

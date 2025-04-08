import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { refreshToken } from "@/app/utils/utils";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
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
        // console.log(credentials);

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
          user.refresh_token = token.refresh_token;
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
    // redirect({ url, baseUrl }) {
    //   // console.log(`url: ${url}`);
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    signIn({ account, user }) {
      if (account?.provider === "google") {
        //CALL API --> Back-End Trả về accessToken
        (user as { access_token?: string }).access_token = "abc google";
        user.name = "New Name Google";
      }

      if (account?.provider === "github") {
        //CALL API --> Back-End Trả về accessToken
        (user as { access_token?: string }).access_token = "abc github";
        user.name = "New Name Github";
      }
      return true;
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin

      if (account) {
        if (account.access_token) {
          token.accessToken = account.access_token;
        }
        if (account.refresh_token) {
          token.refreshToken = account.refresh_token;
        }
      }

      if (user) {
        const userDetail = user as User & {
          access_token?: string;
          refresh_token?: string;
        };
        if (userDetail.access_token) {
          token.accessToken = userDetail.access_token;
        }
        if (userDetail.refresh_token) {
          token.refreshToken = userDetail.refresh_token;
        }
      }

      //Kiểm tra xem accessToken có hết hạn không?
      //- Nếu còn hạn --> return token
      //- Nếu hết hạn --> Lấy refreshToken để call api --> cấp lại accessToken mới và refreshToken mới (Nếu có) --> Lưu accessToken vào trong token và return về
      const payloadAccessToken = (token.accessToken as string).split(".")[1];

      //Decode payload
      const payloadDecoded = JSON.parse(
        Buffer.from(payloadAccessToken, "base64").toString()
      );

      if (payloadDecoded.exp) {
        const accessTokenExp = payloadDecoded.exp;
        // const accessTokenExp = new Date().getTime() / 1000 - 100;
        const currentTime = new Date().getTime() / 1000;
        if (currentTime >= accessTokenExp) {
          console.log("hết hạn");

          const newToken = await refreshToken(token.refreshToken as string);
          if (newToken) {
            token.accessToken = newToken.access_token;
            token.refreshToken = newToken.refresh_token;
            token.forceLogout = false;
          } else {
            token.forceLogout = true;
          }
        }
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session & { accessToken?: string; forceLogout?: boolean };
      token: JWT;
    }) {
      session.accessToken = token.accessToken as string;
      session.forceLogout = token.forceLogout as boolean;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

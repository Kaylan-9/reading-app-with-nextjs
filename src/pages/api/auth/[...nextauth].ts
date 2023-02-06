import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/db/prisma";
import { account } from "@/lib/db/users";

export const authOptions = {
  session: {
    jwt: true,
    strategy: 'jwt',
    maxAge: 7 * 24 * 3600,
  },
  jwt: {
    maxAge: 7 * 24 * 3600,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: "Name", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, _) {
        const name = credentials?.name ?? '';
        const password = credentials?.password ?? '';
        const user = await account(name, password);
        if(typeof user?.id==='string') {
          console.log(user);
          return user;
        }
        return null;
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user, token }: any) {
      session.accessToken = token.accessToken;
      if (session?.user && token) {
        session.user.id = token.sub;
      }
      if (session?.user && !token) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
}

export default NextAuth(authOptions as any);
 
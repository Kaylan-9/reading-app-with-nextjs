import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/db/prisma";
import { account } from "../../../lib/db/users";

export const authOptions = {
  session: {
    maxAge: 7 * 24 * 3600,
  },
  secret: process.env.NEXTAUTH_SECRET,
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
          return user;
        }
        return null;
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user, token }: any) {
      session.accessToken = token?.accessToken;
      if (session?.user && token) session.user.id = token.sub;
      if (session?.user && !token) session.user.id = user.id;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) token.id = user.id;
      if (account) token.accessToken = account.access_token;
      return token;
    },
    
  },
}

export default NextAuth(authOptions as any);
 
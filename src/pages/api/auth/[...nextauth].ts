import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/db/prisma";
import { account } from "@/lib/db/users";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, _) {
        const email = credentials?.email ?? '';
        const password = credentials?.password ?? '';
        const user = await account(email, password);
        if (user) return user;
        return null;
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }: any) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
}

export default NextAuth(authOptions);
 
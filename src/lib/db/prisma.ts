import { PrismaClient, Prisma } from "@prisma/client";

export const Types = Prisma; 
declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
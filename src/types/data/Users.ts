import { Prisma, User } from "@prisma/client";

export interface IUser extends Omit<User, 'id' | 'password' | 'emailVerified'> {
  password?: string;
}
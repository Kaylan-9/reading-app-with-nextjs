import { Prisma, User } from "@prisma/client";
import { IBookUser } from "./Books";

export interface IUser extends Omit<User, 'id' | 'password' | 'emailVerified'> {
  password?: string;
}

export interface IUserBook extends IUser {
  book: IBookUser[]
}
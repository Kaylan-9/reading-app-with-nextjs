import { Prisma, User } from "@prisma/client";
import { IBookUser, IBookUserCategories } from "./Books";

export interface IUser extends Omit<User, 'id' | 'password' | 'emailVerified'> {
  password?: string;
}

export interface IUserBook extends IUser {
  book: IBookUser[]
}

export interface IUserBookCategories extends IUserBook {
  book: IBookUserCategories[]
}
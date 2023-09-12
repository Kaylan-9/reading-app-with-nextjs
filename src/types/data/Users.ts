import { Prisma, User } from "@prisma/client";
import { IBookUser, IComicUserCategories } from "./Comics";

export interface IUser extends Omit<User, 'password' | 'emailVerified'> {
  password?: string;
}

export interface IUserBook extends IUser {
  book: IBookUser[]
}

export interface IUserBookCategories extends IUserBook {
  book: IComicUserCategories[]
}

export interface IUserBookCategoriesPublic extends Omit<IUserBookCategories, 'password' | 'emailVerified' | 'email'> {}
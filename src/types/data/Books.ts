import { Prisma, Book, Images, User, Categories } from "@prisma/client"


export interface IBookCreateInputDB extends Prisma.BookCreateInput {}
export interface IBookCreateInput extends Prisma.BookUncheckedCreateWithoutImagepathsInput {
  imagepaths: {
    name: string;
    type: string;
  }[]
}

export default interface IBook extends Book {imagepaths: Images[] | [];}
export interface IBookCategories extends IBook {categorie: Categories;}
export interface IBookUser extends IBook {user: Omit<User, 'password' | 'email' | 'emailVerified'>;}
export interface IBookUserCategories extends IBookCategories, IBookUser {}

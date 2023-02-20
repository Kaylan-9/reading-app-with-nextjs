import { Prisma, Book, Images, User, Categories } from "@prisma/client"


export interface IBookCreateInputDB extends Prisma.BookCreateInput {}
export interface IBookCreateInput extends Prisma.BookUncheckedCreateWithoutImagepathsInput {
  imagepaths: {
    name: string;
    type: string;
  }[]
}

export default interface IBook extends Book {imagepaths: Images[] | [];}
export interface IBookUser extends IBook {user: User;}
export interface IBookUserCategories extends IBookUser {categorie: Categories;}

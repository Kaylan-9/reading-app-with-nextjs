import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export interface Books {
  id?: number;
  title: string;
  imagepaths: any;
  path: string;
  description: string;
  categorie: string;
}

export interface Images {
  id?: number;
  name: string;
  type: string;
  book?: Books;
  idBook?: number;
}

export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  isLoggedIn?: boolean;
}

export async function getAllBooks() {
  const data = await prisma.books.findMany({
    include: {
      imagepaths: true
    }
  });
  return data;
}

export async function getBook(id: number) {
  const data = await prisma.books.findUnique({
    where: {
      id: id
    },
    include: {
      imagepaths: true
    }
  });
  return data;
}

export async function getBooks(title: string, category: string | false) {
  type whereType = {
    title?: string,
    categorie?: string
  }
  let where: whereType = {}
  if(typeof title==="string") where.title= title;
  if(typeof category==="string") where.categorie = category;
  const data = await prisma.books.findMany({
    where: where,
    include: {
      imagepaths: true
    }
  });
  return data;
}

export async function getAllUsers() {
  const data =await prisma.users.findMany();
  return data;
}

export async function createBook(data: Prisma.BooksCreateInput) {
  const imagepaths: any = data.imagepaths;
  delete data.imagepaths;
  const newBook = await prisma.books.create({data});
  Promise.all(await imagepaths.map(async (img: Prisma.ImagesCreateManyBookInput) => {
    await prisma.images.create({
      data: {
        ...img,
        idBook: newBook.id
      }
    })
  }))
}

export async function deleteBook(data: Books) {
  const {id} = data;
  await prisma.books.delete({
    where: {id}
  })
}

export async function getUser(data: Users) {
  const {name, password} = data;
  const user = await prisma.users.findFirst({
    where: {name, password}
  });
  return user;
}


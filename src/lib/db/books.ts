import { Prisma, User } from "@prisma/client";
import prisma from "./prisma";

export interface Books {
  id?: number;
  title: string;
  imagepaths: any;
  path: string;
  description: string;
  idCategory: number;
  idUser: string;
}

export interface BookUser extends Books {
  user: User
}

export async function deleteBook(id: number) {
  await prisma.images.deleteMany({
    where: {idBook: id}
  });
  await prisma.book.delete({
    where: {id: id}
  });
}

export async function createBook(data: Prisma.BookCreateInput) {
  const imagepaths: any = data.imagepaths;
  delete data.imagepaths;
  const newBook = await prisma.book.create({data});
  Promise.all(await imagepaths.map(async (img: Prisma.ImagesCreateManyBookInput) => {
    await prisma.images.create({
      data: {
        ...img,
        idBook: newBook.id
      }
    })
  }))
}

export async function getAllBooks(n?: number) {
  const data = await prisma.book.findMany({
    take: 4,
    skip: (n!==undefined && typeof n==='number') ? n*4 : 0,
    cursor: {id: (n!==undefined && typeof n==='number') ? n+2 : 2},
    include: {
      imagepaths: true,
      user: true
    },
    orderBy: {id: 'asc'}
  });
  return data;
}

export async function countPages() {
  const nBooks = await prisma.book.count();
  return Math.floor(nBooks/4);
}

export async function getBook(id: number) {
  const data = await prisma.book.findUnique({
    where: {
      id: id
    },
    include: {
      imagepaths: true,
      categorie: true,
      user: true
    }
  });
  return data;
}

export async function getBooks(title: string, category: number | false) {
  type whereType = {
    title?: string,
    idCategory?: number
  }
  let where: whereType = {}
  if(typeof title==="string") where.title= title;
  if(typeof category==="string") where.idCategory = category;
  const data = await prisma.book.findMany({
    where: where,
    include: {
      categorie: true,
      imagepaths: true,
      user: true
    }
  });
  return data;
}
import { Prisma } from "@prisma/client";
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

export async function deleteBook(id: number) {
  await prisma.images.deleteMany({
    where: {idBook: id}
  });
  await prisma.books.delete({
    where: {id: id}
  });
}

export async function createBook(data: Prisma.BooksCreateInput) {
  const imagepaths: any = data.imagepaths;
  delete data.imagepaths;
  console.log(data);
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
      imagepaths: true,
      categorie: true
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
  const data = await prisma.books.findMany({
    where: where,
    include: {
      categorie: true,
      imagepaths: true
    }
  });
  return data;
}
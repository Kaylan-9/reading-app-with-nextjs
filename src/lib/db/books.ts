import { IBookCreateInputDB } from "@/types/data/Books";
import { ImagesCreateManyBookInput } from "@/types/data/Images";
import prisma from "./prisma";

export async function deleteBook(id: number) {
  await prisma.images.deleteMany({
    where: {idBook: id}
  });
  await prisma.book.delete({
    where: {id: id}
  });
}

export async function createBook(data: IBookCreateInputDB) {
  const imagepaths: any = data.imagepaths;
  delete data.imagepaths;
  const newBook = await prisma.book.create({data});
  Promise.all(await imagepaths.map(async (img: ImagesCreateManyBookInput) => {
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
      categorie: true,
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

export const getBooks = async (title?: string, idCategory?: number) => {
  let where = {
    title, 
    idCategory
  }
  const data = await prisma.book.findMany({
    where: where,
    include: {      
      imagepaths: true,
      categorie: true,
      user: true
    }
  });
  return data;
}
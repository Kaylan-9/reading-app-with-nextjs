import { prisma } from "./prisma";

export interface Book {
  id: number;
  title: string;
  imagepath: string;
  description: string;
}

export async function getAllBooks() {
  const data =await prisma.book.findMany();
  return data;
}

export async function createBook(data: Book) {
  const {
    title,
    imagepath,
    description,
  } = data; 
  await  prisma.book.create({
    data: {
      title,
      imagepath,
      description,
    }
  })
}

export async function getUser() {
  const data = await prisma.book.findFirst();
  return data;
}


import { prisma } from "./prisma";

export interface Book {
  id: number;
  title: string;
  imagepath: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isLoggedIn?: boolean;
}

export async function getAllBooks() {
  const data =await prisma.book.findMany();
  return data;
}

export async function getAllUsers() {
  const data =await prisma.user.findMany();
  return data;
}

export async function createBook(data: Book) {
  const {
    title,
    imagepath,
    description,
  } = data; 
  await prisma.book.create({
    data: {
      title,
      imagepath,
      description,
    }
  })
}

export async function deleteBook(data: Book) {
  const {id} = data;
  await prisma.book.delete({
    where: {id}
  })
}

export async function getUser(data: User) {
  const {name, password} = data;
  const user = await prisma.user.findFirst({
    where: {name, password}
  });
  return user;
}


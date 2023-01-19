import { prisma } from "./prisma";

export interface Books {
  id: number;
  title: string;
  imagepaths: Images[];
  description: string;
}

export interface Images {
  id: number;
  name: string;
  path: string;
  idBook: number;
}

export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  isLoggedIn?: boolean;
}

export async function getAllBooks() {
  const data = {}
  // await prisma.books.findMany();
  return data;
}

export async function getAllUsers() {
  const data =await prisma.users.findMany();
  return data;
}

export async function createBook(data: Books) {
  const {
    title,
    imagepaths,
    description,
  } = data; 
  await prisma.books.create({
    data: {
      title,
      imagepaths,
      description,
    }
  })
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


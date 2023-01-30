import prisma from "./prisma";

export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  isLoggedIn?: boolean;
}

export async function getAllUsers() {
  const data =await prisma.users.findMany();
  return data;
}

export async function getUserBooks(id: number) {
  const where = {id};
  return (await prisma.users.findUnique({
    where: where,
    include: {
      book: {
        include: {
          imagepaths: true
        }
      }      
    }
  }));
}

export async function getUser(data: Users) {
  const {name, password} = data;
  const user = await prisma.users.findFirst({
    where: {name, password}
  });
  return user;
}

import prisma from "./prisma";

export interface Users {
  id: number;
  name: string;
  email: string;
  image: string;
  password?: string;
}

export async function getAllUsers() {
  const data =await prisma.user.findMany();
  return data;
}

export async function getUserBooks(id: string) {
  const where = {id};
  return (await prisma.user.findUnique({
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
  const {name, email, image} = data;
  const user = await prisma.user.findFirst({
    where: {name, email, image}
  });
  return user;
}

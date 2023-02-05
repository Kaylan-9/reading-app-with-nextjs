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

export async function createNewAccount(name: string, email: string, password: string) {
  const newUser= await prisma.user.create({
    data: {
      name, 
      email, 
      password
    }
  });
  return newUser;
}

export async function account(email: string, password: string) {
  const where = { 
    email, 
    password
  };
  const newUser= await prisma.user.findFirst({
    where,
    select: {
      id: true,
      name: true,
      image: true
    }
  });
  return newUser;
}

export async function getUserBooks(id: string) {
  const where = {id};
  return (await prisma.user.findUnique({
    where: where,
    include: {
      book: {
        include: {
          imagepaths: true
        },
        where: {
          idUser: id
        }
      }      
    }
  }));
}

export async function getProfileData() {
  return (await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    }
  }))
};

export async function getUser(data: Users) {
  const {name, email, image} = data;
  const user = await prisma.user.findFirst({
    where: {name, email, image}
  });
  return user;
}

import { IUser } from "@/types/data/Users";
import prisma from "./prisma";

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

export async function account(name: string, password: string) {
  const where = { 
    name, 
    password
  };
  const user= await prisma.user.findFirst({
    where,
    select: {
      id: true,
      name: true,
      password: true
    }
  });
  return user;
}

export async function getUserBooks(id: string) {
  const where = {id};
  return (await prisma.user.findUnique({
    where: where,
    include: {
      book: {
        include: {
          imagepaths: true,
          categorie: true
        },
        where: {
          idUser: id
        }
      }      
    }
  }));
}

export async function getUserFavoriteBooks(id: string) {
  return (await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      favorites: {
        include: {
          book: {
            include: {
              imagepaths: true,
              categorie: true
            }
          }
        },
        where: {
          userId: id
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

export async function getUser(data: IUser) {
  const {name, email, image} = data;
  const user = await prisma.user.findFirst({
    where: {name, email, image}
  });
  return user;
}

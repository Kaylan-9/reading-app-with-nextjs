import { IUser, IUserBookCategoriesPublic } from "@/types/data/Users";
import { Book } from "@prisma/client";
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

export async function getRandomUsersBooks() {
  const nUsers= await prisma.user.count();
  let 
    data: IUserBookCategoriesPublic[]= [],
    count= 0,
    booksCount= 0;
  while(data.length<3 || count<8) {
    const newItem= (await prisma.user.findMany({
      include: {
        book: {
          include: {
            imagepaths: {
              take: 3,
              skip: 0  
            },
            categorie: true
          },
          take: 3,
          skip: 0    
        }     
      },
      take: 1,
      skip: Math.floor(Math.random() * nUsers)
    }))[0] as any;
    if(!data.some((item: IUserBookCategoriesPublic) => item.id===newItem.id)){
      data.push(newItem as any);
    }
    count++;
  }
  count= 0;
  data.map(userData=> userData.book.map(_=> {
    booksCount++;
  }));
  while(data.length<3 && booksCount!=10 && count<(data.length-1)) {
    const 
      userID= data[count].id,
      bookIDs= data[count].book.map(book=> book.id);
    const newItem= (await prisma.book.findFirst({
      where: {
        id: { notIn: bookIDs },
        user: {
          id: userID
        }
      },
      include: {
        imagepaths: {
          take: 3,
          skip: 0  
        },
        categorie: true
      },
    }));
    if(newItem!==null) {
      data[count].book= [...data[count].book, newItem] as any;
      booksCount++;
      if(count<(data.length-1)) count++;
    }
  }
  return data;
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

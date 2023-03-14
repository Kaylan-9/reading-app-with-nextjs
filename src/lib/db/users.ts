import { IBookCategories } from "@/types/data/Books";
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
  let 
    data: IUserBookCategoriesPublic[]= [],
    currentUser= 0,
    booksCount= 0,
    attemptsCount= 0,
    booksN= await prisma.book.count(),
    usersN= await prisma.user.count(),
    bookIDs: number[]= [],
    userIDs: string[]= [];
  while((data.length<3 && usersN>=3 && userIDs.length<usersN && attemptsCount<10) || (data.length<usersN && usersN<3)) {
    const newItem= (await prisma.user.findMany({
      where: {
        id: { notIn: userIDs },
      },
      include: {
        book: {
          include: {
            imagepaths: {take: 3, skip: 0},
            categorie: true
          },
          take: 3, skip: 0    
        }     
      },
      take: 1,
      skip: Math.floor(Math.random() * usersN)
    }))[0] as any;
    if(newItem!==null && newItem?.id!==undefined) {
      userIDs.push(newItem?.id);
      if(newItem.book.length>=3 && !data.some((item: IUserBookCategoriesPublic) => item.id===newItem?.id)){
        data.push(newItem as any);
      }
    }
    attemptsCount++;
  }
  attemptsCount= 0;
  data.map(userData=> userData.book.map(book=> {
    bookIDs.push(book.id);
    booksCount++;
  }));
  while(((booksCount<10 && booksN>=10) || (booksCount<booksN && booksN<10)) && attemptsCount<(booksCount*2)) {
    const userID= data[currentUser]?.id;
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
      data[currentUser].book= [...data[currentUser]?.book, newItem] as any;
      bookIDs.push(newItem.id);
      booksCount++;
      currentUser= currentUser<data.length-1 ? currentUser+1 : 0;
    }
    attemptsCount++;
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

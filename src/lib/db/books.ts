import { IBookCreateInputDB, IBookUser, IBookUserCategories } from "@/types/data/Books";
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
    take: 10,
    skip: (n!==undefined && typeof n==='number') ? n*10 : 0,
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

export async function getAllBooksByCategory(n: number, category: string) {
  const data = await prisma.book.findMany({
    take: 10,
    skip: n*10,
    cursor: {id: n+2},
    where: {
      categorie: {
        name: category
      }
    },
    include: {
      imagepaths: true,
      categorie: true,
      user: true
    },
    orderBy: {id: 'asc'}
  });
  return data;
}

export async function getRandomBooks() {
  const amountData = 10;
  let nBooks= await prisma.book.count();
  let 
    randomIDs: number[] = [],
    ignoreIDs: number[] = []
  ;
  let data: IBookUserCategories[] = [];
  while(randomIDs.length<amountData) {
    const randomID= Math.round(Math.random()*nBooks);
    if(!randomIDs.includes(randomID) && !ignoreIDs.includes(randomID)) {
      const newData = await prisma.book.findUnique({
        where: {id: randomID},
        include: {
          imagepaths: true,
          categorie: true,
          user: true
        },
      });

      if(newData!==null) {
        data.push(newData as IBookUserCategories)
        randomIDs.push(randomID);
      } else {
        ignoreIDs.push(randomID)
        nBooks++;
      }
    }
  }
  return data;
}


export async function countPages(category?: string) {
  let nBooks: number;
  if(typeof category==='string') {
    nBooks= await prisma.book.count({
      where: {
        categorie: {
          name: category
        }
      }
    });
  } else {
    nBooks= await prisma.book.count();
  }
  return Math.floor(nBooks/10);
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
import { IBookCreateInputDB, IBookUserCategories } from "@/types/data/Books";
import { ImagesCreateManyBookInput } from "@/types/data/Images";
import { NextRequest, NextResponse } from "next/server";
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

export async function getAllBooks(n: number) {
  const data = await prisma.book.findMany({
    include: {
      imagepaths: true,
      categorie: true,
      user: true
    },
    take: 10,
    skip: n*10,
  });
  return data;
}

export async function getAllBooksByCategory(n: number, idCategory: number) {
  const count= await prisma.book.count({where: {idCategory}});
  const data= count>=10 ? await prisma.book.findMany({
    where: {
      idCategory: idCategory
    },
    include: {
      imagepaths: true,
      categorie: true,
      user: true
    },
    orderBy: {id: 'asc'},
    take: 10,
    skip: n*10,
  }) : prisma.book.findMany({
    where: {
      idCategory: idCategory
    },
    include: {
      imagepaths: true,
      categorie: true,
      user: true
    },
    orderBy: {id: 'asc'}
  });
  console.log(data)
  return data;
}

export async function getRandomBooks() {
  const amountData = 10;

  let nBooks: number = await prisma.book.count(),
      randomIDs: number[] = [],
      ignoreIDs: number[] = [],
      data: IBookUserCategories[] = [];

  if(nBooks>=amountData) {
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
          ignoreIDs.push(randomID);
          nBooks++;
        }
      }
    }
  } else data = await prisma.book.findMany({
    include: {
      imagepaths: true,
      categorie: true,
      user: true 
    }
  }) as IBookUserCategories[];
  return data;
}

export async function getRandomBook(iDsIgnore: number[]) {
  const attempsLimit= 6;
  let iDs= (await Promise.all(await prisma.book.findMany({
    select: { id: true},
    take: 45
  })))?.map(book=> book.id);
  
  iDs= iDs.filter((id: number)=> 
    !iDsIgnore.some((iDIgnore: number)=> id===iDIgnore)
  );

  let attemps= 0;
  let ignoreIDs: number[] = [];
  let data: IBookUserCategories | null = null;

  while(data===null && attemps<attempsLimit) {
    const randomID= Math.round(Math.random()*iDs.length);
    if(!iDsIgnore.some((id: number)=> iDs[randomID]===id) && iDs.some((id: number)=> iDs[randomID]===id)) {
      const newData = await prisma.book.findFirst({
        where: {
          id: iDs[randomID]
        },
        include: {
          imagepaths: true,
          categorie: true,
          user: true
        },
      });

      if(newData!==null) data= newData as IBookUserCategories
      else ignoreIDs.push(randomID);
      attemps++;
    }
  }

  return data;
}

export const morePopular= async () => {
  const data= await prisma.book.findMany({
    include: {
      imagepaths: true,
      categorie: true,
      favorites: true
    },
    orderBy: {
      favorites: { 
        _count: 'desc'
      }        
    },
    take: 10
  });
  return data;
}


export async function countPages(idCategory?: number) {
  let nBooks: number;
  if(typeof idCategory==='number') nBooks= await prisma.book.count({where: {idCategory}});
  else nBooks= await prisma.book.count();
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
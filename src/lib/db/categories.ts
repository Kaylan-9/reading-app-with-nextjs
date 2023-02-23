import prisma from './prisma';

export async function createCategory(name: string) {
  return await (prisma.categories.create({
    data: {
      name: name,
    }
  }))
}

export async function categoryNotExistCreate(category: string) {
  const data= await  prisma.categories.findFirst({
    where: {
      name: category
    }
  });
  return data===null ? await createCategory(category) : data;
}

export async function getAllCategory() {
  return (await prisma.categories.findMany());
}
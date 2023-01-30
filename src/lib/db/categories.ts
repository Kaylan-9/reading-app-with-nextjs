import prisma from './prisma';

export async function createCategory(name: string) {
  return await (prisma.categories.create({
    data: {
      name: name,
    }
  }))
}

export async function getAllCategory() {
  return (await prisma.categories.findMany());
}
export async function isFavorite(userId: string, bookId: number): Promise<boolean> {
  const where = {
    userId,
    bookId
  }
  const data = await prisma?.favorite.findFirst({where});
  return (data ?? false)!==false;
}


export async function setFavorite(userId: string, bookId: number) {
  const data = {
    userId,
    bookId
  }
  return await prisma?.favorite.create({data});
}

export async function unsetFavorite(userId: string, bookId: number) {
  const where = {
    userId,
    bookId
  }
  return await prisma?.favorite.deleteMany({where});
}
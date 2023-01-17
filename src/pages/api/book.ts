import type { NextApiRequest, NextApiResponse } from 'next'
import { createBook, deleteBook } from "@/lib/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;
    await createBook(data);
    return res.status(200).json({message: 'Success'})
  }

  if (req.method === 'DELETE') {
    const data = req.body;
    await deleteBook(data);
    return res.status(200).json({message: 'Success'})
  }

  res.status(200).json({ name: 'John Doe'})

}


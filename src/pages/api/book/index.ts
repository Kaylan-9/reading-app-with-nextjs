import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteBook } from "@/lib/db"

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'DELETE') {
    const data = req.body;
    await deleteBook(data);
    return res.status(200).json({message: 'Success'})
  }

  res.status(200).json({ name: 'John Doe'})

}


import { getBook } from "@/lib/db/books";
import type { NextApiRequest, NextApiResponse } from "next";

export const config= {
  api: {
    bodyParser: true
  }
}

export default async function deleteBook( 
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.body;
      const book= await getBook(id);
      return res.status(200).json({book, message: 'Success'})
    } catch(error) {
      console.log(error);
      return res.status(400).json({message: error})
    }
  }
}
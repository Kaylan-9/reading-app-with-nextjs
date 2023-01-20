import formidable from 'formidable';
import micro from 'micro';
import { join } from "path";
import { mkdir, stat } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from 'next'
import { createBook, deleteBook } from "@/lib/db"
import { parseForm } from '@/lib/parse-form';

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


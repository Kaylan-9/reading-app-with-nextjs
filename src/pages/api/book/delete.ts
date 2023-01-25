import { NextApiRequest, NextApiResponse } from "next";
import { rmdir } from "fs/promises";
import { deleteBook as deleteBookInDB } from "@/lib/db"; 
import { join } from "path";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function deleteBook( 
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { id, path } = req.body;
      const deleteDir = join(
        process.env.ROOT_DIR || process.cwd(),
        `/images/${path}`
      );
      
      await deleteBookInDB(id);
      await rmdir(deleteDir, { recursive: true });
      return res.status(200).json({message: 'Success'})
    } catch(error) {
      console.log(error);
      return res.status(400).json({message: error})
    }
  }
}
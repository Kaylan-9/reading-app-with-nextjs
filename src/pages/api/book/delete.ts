import { NextApiRequest, NextApiResponse } from "next";
import { deleteBook as deleteBookInDB } from "@/lib/db"; 

export default async function deleteBook( 
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      await deleteBookInDB(id);
      return res.status(200).json({message: 'Success'})
    } catch(error) {
      console.log(error);
      return res.status(400).json({message: error})
    }
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
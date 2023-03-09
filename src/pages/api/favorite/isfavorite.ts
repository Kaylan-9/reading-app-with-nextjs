import { isFavorite } from "@/lib/db/favorite";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function( 
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { bookID, customerID } = req.body;
      const data= await isFavorite(customerID, bookID);
      return res.status(200).json({data, message: 'Success'})
    } catch(error) {
      console.log(error);
      return res.status(400).json({message: error})
    }
  }
}
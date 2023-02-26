import { isFavorite } from "@/lib/db/favorite";
import {  } from "@/lib/db/users";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function isfavorite( 
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
import { getBooks } from "@/lib/db/books";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function doSearch(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try{
      const { title, category } = req.body;
      res.status(200).json({
        research : (await getBooks(title, category)),
        error: null,
      });
    } catch(error) {
      console.log(error);
      res.status(400).json({
        research : null,
        error: "Not found ~ 404",
      });
    } 
  }
}
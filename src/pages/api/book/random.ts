import { getRandomBook } from "@/lib/db/books";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if(req.method==="POST") {
    const { iDs }= req.body;
    const users= await getRandomBook(iDs);
    return res.json(users);
  }
}

import { getRandomUsersBooks } from "@/lib/db/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if(req.method==="POST") {
    const { iDs }= req.body;
    const users= await getRandomUsersBooks();
    return res.json(users);
  }
}

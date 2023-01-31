import { getUser } from "@/lib/db/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const result = getUser(data);
      res.status(200).json(await result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } 
  
  else if (req.method === 'GET') {
    res.status(500).json({message: "test"});
  }
};

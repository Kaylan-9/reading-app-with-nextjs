import { createNewAccount } from "@/lib/db/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  if(req.method==='POST') {
    const {
      name, 
      email, 
      password
    } = req.body;
    const newUser = await createNewAccount(name, email, password);
    return res.status(200).send({
      error: null, 
      data: newUser
    });
  }
  return res.status(200).send({});
}
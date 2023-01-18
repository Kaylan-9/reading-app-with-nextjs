import { getUser, User } from "@/lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log("teste drive ")
    try {
      const data = req.body;
      const user = await getUser(data) as User;
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  if (req.method === 'GET') {
    res.status(500).json({message: "test"});
  }
};

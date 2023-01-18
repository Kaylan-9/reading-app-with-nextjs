
import { getUser } from "@/lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(
  async function loginRoute(
    req: any, 
    res: any
  ) {
    if (req.method === 'POST') {
      const data = req.body;
      const user = await getUser(data);
      req.session.user = {
        id: 230,
        admin: true,
      };
      await req.session.save();
      return res.status(200).json({...user, message: 'Success'})
    }
  },
  {
    cookieName: "admlogin",
    password: "complex_password_at_least_32_characters_long",
  },
);
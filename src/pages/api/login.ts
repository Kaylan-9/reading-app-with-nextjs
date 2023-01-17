
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(
  async function loginRoute(
    req: any, 
    res: any
  ) {
    if (req.method === 'GET') {
      const data = req.body;
      return res.status(200).json({message: 'Success'})
    }



    req.session.user = {
      id: 230,
      admin: true,
    };
    alert("teste")
    await req.session.save();
    res.send({ ok: true });
  },
  {
    cookieName: "admlogin",
    password: "complex_password_at_least_32_characters_long",
  },
);
import { NextApiRequest } from "next";
import cookie from 'cookie';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function(req: NextApiRequest, res: NextApiRequest | any) {
  if(req.method==='POST') {
    let { cookies } = req.body;
    cookies= JSON.stringify(cookies);
    res.setHeader('Set-Cookie', cookie.serialize('cookiepolicy', cookies, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    }));
    return res.status(200).send({success: true});
  }
}
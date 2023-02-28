import { NextApiRequest } from "next";
import cookie from 'cookie';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function(req: NextApiRequest, res: NextApiRequest | any) {
  if(req.method==='POST') {
    const { cookie: _cookie } = req.headers;
    const cookies = cookie.parse(_cookie || '');
    return res.status(200).send({cookies});
  }
}
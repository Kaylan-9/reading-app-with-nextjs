import { NextApiRequest } from "next";
import cookie from 'cookie';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function(req: NextApiRequest, res: NextApiRequest | any) {
  if(req.method==='POST') {
    const { cookie: _cookie }= req.headers;
    const cookies= cookie.parse(_cookie || '');
    const cookiepolicy= cookies?.policy!==undefined && cookies!==undefined ? JSON.parse(cookies?.policy ?? {}) : false;
    return res.status(200).send({acceptedterms: cookiepolicy});
  }
}
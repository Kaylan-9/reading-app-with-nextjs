import { setFavorite, unsetFavorite } from "@/lib/db/favorite";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function changemark(req: NextApiRequest, res: NextApiResponse) {
  if(req.method==='POST') {
    const { isfavorite, userId, bookId } = req.body;
    try {
      if(isfavorite) {
        return res.status(200).send(await unsetFavorite(userId, bookId));
      } else {
        return res.status(200).send(await setFavorite(userId, bookId));
      }
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}
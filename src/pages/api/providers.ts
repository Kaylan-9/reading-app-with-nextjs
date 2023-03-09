import { NextApiRequest, NextApiResponse } from "next";
import { getProviders } from "next-auth/react";

export default async function providers(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    try {
      const providers = await getProviders();
      console.log(providers);
      return res.status(200).send({error: null, providers});
    } catch (error) {
      return res.status(500).send({error: 'Internal Server! Error', providers: null});
    }
  }
}
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ name: 'John Doe'})
}

